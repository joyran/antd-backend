/**
 * 新增更新行模态框
 */

import React from 'react'
import { Modal, Button, Form, Input, DatePicker, InputNumber, Select } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { closeFormModal, createRow, updateRow } from '../../actions/rowFormModal'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option

const RowFormModalUI = (props) => {
  const { visible, title, saveBtnLoading, row } = props.rowFormModal
  const { dispatch } = props
  const { getFieldDecorator } = props.form

  // 点击保存按钮保存数据
  const handleOk = (e) => {
    e.preventDefault()
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }

      // 如果表单中有 moment 日期格式需要转换为字符串提交
      Object.keys(fieldsValue).map((key) => {
        const value = fieldsValue[key]
        if (value instanceof moment) {
          fieldsValue[key] = value.format('YYYY-MM-DD')
        }

        return fieldsValue
      })

      if (title === '新增') {
        dispatch(createRow(fieldsValue))
      } else {
        dispatch(updateRow(fieldsValue))
      }
    })
  }

  // form 样式
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  // 重置表单
  const resetForm = () => {
    props.form.resetFields()
  }

  /**
   * 根据后台返回的 data 中 type 类型生成不同的组件
   * @param item  json
   * @param Component
   */
  const switchItem = (item) => {
    switch (item.type) {
      case 'InputNumber':
        return <InputNumber min={item.min} max={item.max} style={{ width: '100%' }} />
      case 'Input':
        return <Input />
      case 'DatePicker':
        return <DatePicker style={{ width: '100%' }} />
      case 'Select':
        return (
          <Select>
            {
              item.options.map((option, index) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            }
          </Select>
        )
      default:
        return <Input />
    }
  }

  return (
    <Modal
      visible={visible}
      title={title}
      closable={false}
      afterClose={resetForm}
      footer={[
        <Button key="cancel" size="large" onClick={() => dispatch(closeFormModal())}>取消</Button>,
        <Button key="save" type="primary" size="large" loading={saveBtnLoading} onClick={handleOk}>保存</Button>
      ]}
    >
      <Form>
        {
          row.map((item) => {
            // type 为 DatePicker 日期格式需要强制转化为 moment 格式
            item.value = item.type === 'DatePicker' && item.value ? moment(item.value, 'YYYY-MM-DD') : item.value
            // 添加记录时日期为空默认为当天日期
            item.value = item.type === 'DatePicker' && !item.value ? moment(Date.now(), 'x') : item.value
            return (
              <FormItem
                label={item.title}
                {...formItemLayout}
                key={item.dataIndex}
              >
                {getFieldDecorator(item.dataIndex, {
                  initialValue: item.value,
                  rules: [{
                    required: item.required,
                    message: item.errorMessage
                  }]
                })(
                  switchItem(item)
                )}
              </FormItem>
            )
          })
        }
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return state
}

const RowFormModal = Form.create()(RowFormModalUI)

export default connect(mapStateToProps)(RowFormModal)
