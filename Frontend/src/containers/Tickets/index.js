import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/tickets/actions';
import Input, { Textarea } from '../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import Popconfirms from '../../components/feedback/popconfirm';
import { Row, Col } from 'antd';
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './articles.style';
import clone from 'clone';
import Tags from '../../components/uielements/tag';
import TagWrapper from './tag.style';
import axios from 'axios';

const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);

class Tickets extends Component {
  state={
    users:[],
    projects:[],
  }
  async componentDidMount() {
    await this.props.getTickets();

    await axios.get("http://127.0.0.1:8000/users/").then((response) => {
        this.setState({users: response.data})     
    });

    await axios.get("http://127.0.0.1:8000/projects/").then((response) => {
        this.setState({projects: response.data})     
    });

  }
  handleRecord = (actionName, ticket) => {
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    this.props.createTicket(ticket, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (ticket = null) => {
    this.props.toggleModal(ticket);
  };

  onRecordChange = (key, event) => {
    let { ticket } = clone(this.props);
    if (key) ticket[key] = event.target.value;
    this.props.update(ticket);
  };

  onSelectChange = (key, value) => {
    let { ticket } = clone(this.props);
    if (key) ticket[key] = value;
    this.props.update(ticket);
  };

  checkValue = ()=>{
    const { ticket } = clone(this.props);
    if (ticket.assignedUser != null && ticket.assignedUser['name']){
      return ticket.assignedUser['name']
    }
    else{
      return ticket.assignedUser
    }
  }

  checkValueProject = ()=>{
    const { ticket } = clone(this.props);
    if (ticket.project != null && ticket.project['title']){
      return ticket.project['title']
    }
    else{
      return ticket.project
    }
  }

  render() {
    const { modalActive, tickets } = this.props;
    const { ticket } = clone(this.props);
    const dataSource = [];
    Object.keys(tickets).map((ticket, index) => {
      return dataSource.push({
        ...tickets[ticket],
        key: ticket,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => { },
    };

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '200px',
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 7) {
              resultArray = resultArray.slice(0, 7);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };
          return trimByWord(row.title);
        },
      },
      {
        title: 'Assigned Person',
        dataIndex: 'assignedUser',
        key: 'assignedUser',
        width: '300px',
        sorter: (a, b) => {
          if (a.assignedUser.name < b.assignedUser.name) return -1;
          if (a.assignedUser.name > b.assignedUser.name) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 20) {
              resultArray = resultArray.slice(0, 20);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.assignedUser.name);
        },
      },
      {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
        // width: '220px',
        sorter: (a, b) => {
          if (a.project < b.project) return -1;
          if (a.project > b.project) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 8) {
              resultArray = resultArray.slice(0, 8);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.project.title);
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: '100px',
        sorter: (a, b) => {
          if (a.priority < b.priority) return -1;
          if (a.priority > b.priority) return 1;
          return 0;
        },
        render: (text, row) => {
          return (
            row.priority == "high" ? (
              <Tag className="mr-5" color="#f50">{row.priority}</Tag>
            ) :row.priority == "medium" ? (
              <Tag className="mr-5" color="#90EE90">{row.priority}</Tag>
              ): (<Tag className="mr-5" color="#808080">{row.priority}</Tag>
            )
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        className: 'noWrapCell',
        key: 'status',
        sorter: (a, b) => {
          if (a.status < b.status) return -1;
          if (a.status > b.status) return 1;
          return 0;
        },

        render: (text, row) => {
          let className;
          if (row.status === ('started' || 'Started' || 'STARTED')) {
            className = 'draft';
          } else if (row.status === ('publish' || 'Publish' || 'PUBLISH')) {
            className = 'publish';
          }
          return <StatusTag className={"publish"}>{row.status}</StatusTag>;
        },
      },
      {
        title: 'Actions',
        key: 'action',
        width: '150px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this ticket？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
              <a href={`ticket_detail/${row.id}`}>detail</a>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Tickets</ComponentTitle>

              <ButtonHolders>
                {/* <ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                </ActionBtn> */}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new ticket
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={ticket.key ? 'Update Ticket' : 'Add New Ticket'}
              okText={ticket.key ? 'Update Ticket' : 'Add Ticket'}
              onOk={this.handleRecord.bind(this, 'insert', ticket)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Title</Label>
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={ticket.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={ticket.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Assigned Person</Label>
                      <Select
                      showSearch={true}
                      placeholder="Assigned Person"
                      onChange={this.onSelectChange.bind(this, 'assignedUser')}
                      value={this.checkValue()}
                      filterOption={(inputValue, option) =>
                        // console.log(option.props.children.toLowerCase().includes(inputValue.toLowerCase()),inputValue)
                        option.props.children.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      style={{ width: '100%' }}
                    > 
                    {
                      this.state.users.map((user,i)=>{
                        return <Option key={user.id} value={[user.name, user.id]} >{user.name}</Option>
                      })
                    } 
  
                    </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Project</Label>
                      <Select
                      showSearch={true}
                      placeholder="Project"
                      onChange={this.onSelectChange.bind(this, 'project')}
                      value={this.checkValueProject()}
                      filterOption={(inputValue, option) =>
                        // console.log(option.props.children.toLowerCase().includes(inputValue.toLowerCase()),inputValue)
                        option.props.children.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      style={{ width: '100%' }}
                    > 
                    {
                      this.state.projects.map((project,i)=>{
                        return <Option key={project.id} value={[project.title, project.id]} >{project.title}</Option>
                      })
                    } 
  
                    </Select>
                </Fieldset>
                <Row>
                  <Col xs={12}>
                      <Fieldset>
                        <Label>Priority</Label>
                            <Select
                            showSearch='true'
                            searchValue=""
                            placeholder="Priority"
                            value={ticket.priority}
                            onChange={this.onSelectChange.bind(this, 'priority')}
                            // style={{ width: '50%' }}
                          >  
                            <Option value='low'  >Low</Option>
                            <Option value='medium'>Meidum</Option>
                            <Option value='high'>High</Option>
                          </Select>
                      </Fieldset>
                  </Col>
                  <Col xs={12}>
                      <Fieldset>
                      <Label>Status</Label>
                      <Select
                        defaultValue={ticket.status}
                        placeholder="Enter Status"
                        onChange={this.onSelectChange.bind(this, 'status')}
                        // style={{ width: '50%' }}
                      >
                        <Option value="New">New</Option>
                        <Option value="In_Progress">In Progress</Option>
                        <Option value="Resolved">Resolved</Option>
                      </Select>
                    </Fieldset>
                  </Col>
                </Row>
              </Form>
            </Modal>
            <TableWrapper
              rowKey="key"
              // rowSelection={rowSelection}
              columns={columns}
              bordered={true}
              dataSource={dataSource}
              loading={this.props.isLoading}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${dataSource.length
                    } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Tickets,
  }),
  actions
)(Tickets);
