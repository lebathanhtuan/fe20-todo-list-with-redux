import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import TaskItem from "./Item";

import {
  addTaskAction,
  deleteTaskAction,
  editTaskAction,
} from "./redux/actions";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [addTaskForm] = Form.useForm();

  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.taskReducer);

  const filterTaskList = taskList.filter((item) => {
    return item.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
  });

  const handleAddTask = (values) => {
    dispatch(
      addTaskAction({
        id: uuidv4(),
        title: values.title,
        description: values.description,
      })
    );
    addTaskForm.resetFields();
  };

  const handleEditTask = (values, id) => {
    dispatch(
      editTaskAction({
        id,
        title: values.title,
        description: values.description,
      })
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskAction({ id }));
  };

  const renderTaskList = useMemo(() => {
    return filterTaskList.map((item) => {
      return (
        <TaskItem
          key={item.id}
          data={item}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    });
  }, [filterTaskList]);

  return (
    <div>
      <h2>To Do List</h2>
      <Card title="Tạo công việc">
        <Form
          form={addTaskForm}
          name="todolistForm"
          layout="vertical"
          initialValues={{
            title: "",
            description: "",
          }}
          onFinish={(values) => handleAddTask(values)}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            validateFirst
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề!",
              },
            ]}
          >
            <Input placeholder="Tiêu đề" />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Nội dung"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Thêm
          </Button>
        </Form>
      </Card>
      <Card title="Tìm kiếm">
        <Input onChange={(e) => setSearchKeyword(e.target.value)} />
      </Card>

      {renderTaskList}
    </div>
  );
}

export default App;
