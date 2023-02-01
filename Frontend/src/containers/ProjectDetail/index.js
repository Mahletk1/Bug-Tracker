import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import { connect } from 'react-redux';
import actions from '../../redux/projectDetail/actions';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import IntlMessages from '../../components/utility/intlMessages';
import Card from './card.style';
import Popconfirms from '../../components/feedback/popconfirm';
import Input, { Textarea } from '../../components/uielements/input';
import { Icon } from 'antd';
import IsoWidgetsWrapper from './widgets-wrapper';
import StickerWidget from './sticker/sticker-widget';
import Tags from '../../components/uielements/tag';
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
import Upload from '../../components/uielements/upload';
import { Link, Redirect, useParams } from 'react-router-dom';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import clone from 'clone';
import TagWrapper from './tag.style';
import axios from 'axios';
const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);
class ProjectDetail extends Component {
  
  state={
    users:[],
  }
 async componentDidMount(){
  await this.props.getProject(this.props.match.params['id'])
    console.log(this.props)

    await axios.get("http://127.0.0.1:8000/users/").then((response) => {
      this.setState({users: response.data})     
  });

  }
  handleRecord = (actionName, project) => {
    project['projectId'] = this.props.match.params['id'];
    if (project.key && actionName !== 'delete') actionName = 'update';
    this.props.createProject(project, actionName);
  };
  // handleComment = (actionName,comment) => {
  //   comment['ticketId'] = this.props.match.params['id'];
  //   if (comment.key && actionName !== 'delete') actionName = 'update';
  //   this.props.createComment(comment,actionName);
  // };
  // handleAttachment = (actionName,attachment) => {
  //   console.log(attachment)
  //   attachment['ticketId'] = this.props.match.params['id'];
  //   if (attachment.key && actionName !== 'delete') actionName = 'update';
  //   this.props.uploadAttachment(attachment,actionName);
  // };
  handleModal = (project = null) => {
    if(project!=null){
      this.props.toggleModal(project[0]);
    }
    else{
      this.props.toggleModal(project);
    }

  };
  onRecordChange = (key, event) => {
    let { project_edit,comment } = clone(this.props);
    if (key) project_edit[key] = event.target.value;
    this.props.update(project_edit);
    // console.log(project_edit)
  };

  onSelectChange = (key, value) => {
    let { project_edit } = clone(this.props);
    if (key) project_edit[key] = value;
    this.props.update(project_edit);
    // console.log(project_edit)
  };
  // onAttachment = (key,event) => {
  //   let { project_edit,update } = clone(this.props);
  //   let files=[]
  //   if(event.fileList.length!=0){
  //     for (let i=0 ; i< event.fileList.length;i++){
  //       files.push({file:event.fileList[i].originFileObj,name:event.fileList[i].originFileObj.name});
  //     }
  //     let file;
  //       var reader = new FileReader();
  //       file=files[files.length-1]
  //       reader.onload = () => {
  //         console.log(file)
  //         project_edit.attachments.push({reader:reader.result,name:file.name});
  //         update(project_edit);
  //         console.log(project_edit)
  //       }
  //       reader.onerror = function (error) {
  //         console.log('Error: ', error);
  //       };
  //       reader.readAsDataURL(file.file);
        
  //   }
  // //  if (key) project_edit[key] = event.fileList;
  // //  this.props.update(project_edit);
  // }
  checkValue = ()=>{
    const { project_edit } = clone(this.props);
    if (project_edit.assignedUser != null && project_edit.assignedUser['name']){
      return project_edit.assignedUser['name']
    }
    else{
      return project_edit.assignedUser
    }
  }

  // checkValueProject = ()=>{
  //   const { project_edit } = clone(this.props);
  //   if (project_edit.project != null && project_edit.project['title']){
  //     return project_edit.project['title']
  //   }
  //   else{
  //     return project_edit.project
  //   }
  // }

  render() {
    
    if(this.props.isLoading){
      return <p>loading...</p>
    }
    else {
      const { rowStyle, colStyle, gutter } = basicStyle;
      const {project_detail,project_edit,modalActive,comments,attachments} = this.props
      // console.log(project_detail[0].tickets)
      let createDate = new Date(`${project_detail[0].created_at}`)
      let updateDate = new Date(`${project_detail[0].updated_at}`)
      const DataSource = [];
      let newTicketCount=0;
      let resolvedTicketCount=0;
      let inProgressTicket=0;
      // console.log(project_edit)
      Object.keys(project_detail[0].tickets).map((ticket, index) => {
        if(project_detail[0].tickets[ticket].status=='New'){
          newTicketCount+=1;
        }
        else if(project_detail[0].tickets[ticket].status==='Resolved'){
          resolvedTicketCount+=1;
        }
        else{
          inProgressTicket+=1;
        }
        // console.log(newTicketCount,resolvedTicketCount,inProgressTicket)
        return DataSource.push({
          ...project_detail[0].tickets[ticket],
          key: ticket,
        });
      });
      // Object.keys(attachments).map((attachment, index) => {
      //   return attachmentDataSource.push({
      //     ...attachments[attachment],
      //     key: attachment,
      //   });
      // });
      
      // console.log(project_detail[0]['id'])
      // let dataSource=[{'commenter': 'hello','message':'firest message'}]
      let dataSource2=[{'property': 'user assigned','oldVal':'Abebe','newVal':'Kebede','updatedAt':'25/25/22'}]
      // let dataSource3=[{'file': 'link to file','notes':'thie is a screenshot the first screenshot','uploader':'Kebede','uploadedAt':'25/25/22'}]
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
            if (row.status === ('New')) {
              className = 'new';
            } else if (row.status === ('In_Progress')) {
              className = 'inProgress';
            }
            else{
              className = 'completed'
            }
            return <StatusTag className={className}>{row.status}</StatusTag>;
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
                {/* <a onClick={this.handleModal.bind(this, row)} href="# ">
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
                </Popconfirms> */}
                {/* <Redirect to={`ticket_detail/${row.id}`}>detail</Redirect> */}
                <Link to={`/bug_tracker/ticket_detail/${row.id}`}>detail</Link>
                {/* <a href={`ticket_detail/${row.id}`}>detail</a> */}
              </ActionWrapper>
            );
          },
        },
      ];
      
      return (
        <LayoutWrapper>
        
            <Modal
              visible={modalActive}
              onClose={this.handleModal.bind(this, null)}
              title={'Update Ticket'}
              okText={'Update Ticket' }
              onOk={this.handleRecord.bind(this, 'update', project_edit)}
              onCancel={this.handleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Title</Label>
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={project_edit.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={project_edit.description}
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
                        <Label>Priority</Label>
                            <Select
                            showSearch='true'
                            searchValue=""
                            placeholder="Priority"
                            value={project_edit.priority}
                            onChange={this.onSelectChange.bind(this, 'priority')}
                            // style={{ width: '50%' }}
                          >  
                            <Option value='low'  >Low</Option>
                            <Option value='medium'>Meidum</Option>
                            <Option value='high'>High</Option>
                          </Select>
                      </Fieldset>
               
              </Form>
            </Modal>
  
                <Row style={rowStyle} gutter={0} justify="start">
                  <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
                    <IsoWidgetsWrapper>
                      {/* Sticker Widget */}
                      <StickerWidget
                        number={<IntlMessages id={`${newTicketCount}`} />}
                        text={<IntlMessages id="New Tickets" />}
                        icon="plus"
                        fontColor="#ffffff"
                        bgColor="#7266BA"
                      />
                    </IsoWidgetsWrapper>
                  </Col>

                  <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
                    <IsoWidgetsWrapper>
                      {/* Sticker Widget */}
                      <StickerWidget
                        number={<IntlMessages id={`${inProgressTicket}`} />}
                        text={<IntlMessages id="Tickets In Progress" />}
                        icon="reload"
                        fontColor="#ffffff"
                        bgColor="#42A5F6"
                      />
                    </IsoWidgetsWrapper>
                  </Col>

                  <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
                    <IsoWidgetsWrapper>
                      {/* Sticker Widget */}
                      <StickerWidget
                        number={<IntlMessages id={`${resolvedTicketCount}`} />}
                        text={<IntlMessages id="Resolved Tickets" />}
                        icon="check-square"
                        fontColor="#ffffff"
                        bgColor="#7ED320"
                      />
                    </IsoWidgetsWrapper>
                  </Col>
                </Row>
                  <Card
                    title={<IntlMessages id="Ticket Details" />}
                    extra={
                      <a onClick={this.handleModal.bind(this, project_detail)}  href="# ">
                        {<IntlMessages id="edit" />}
                      </a>
                    }
                    style={{ width: '100%' }}
                  >
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Project Title" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].title}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Project Description" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].description}`} />}</p>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Assigned Person" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].assignedUser[0]}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Priority" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].priority}`} />}</p>
                        </Col>
                    </Row>
                    {/* <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Priority" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].priority}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Status" />}</strong>
                            <p>{<IntlMessages id={`${project_detail[0].status}`} />}</p>
                        </Col>
                    </Row> */}
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Created At" />}</strong>
                            <p>{<IntlMessages id={`${createDate.toLocaleString()}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Updated At" />}</strong>
                            <p>{<IntlMessages id={`${updateDate.toLocaleString()}`} />}</p>
                        </Col>
                    </Row>  
                    <TableWrapper
                      rowKey="key"
                      // rowSelection={rowSelection}
                      columns={columns}
                      bordered={true}
                      dataSource={DataSource}
                      loading={this.props.isLoading}
                      className="isoSimpleTable"
                      pagination={{
                        defaultPageSize: 4,
                        hideOnSinglePage: true,
                        total: DataSource.length,
                        showTotal: (total, range) => {
                          return `Showing ${range[0]}-${range[1]} of ${DataSource.length
                            } Results`;
                        },
                      }}
                    />     
                  </Card>

           
          </LayoutWrapper>
      );
    }
  }
}

export default connect(
  state => ({
    ...state.ProjectDetail,
  }),
  actions
)(ProjectDetail);