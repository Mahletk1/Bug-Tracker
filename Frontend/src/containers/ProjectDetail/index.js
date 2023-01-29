import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import { connect } from 'react-redux';
import actions from '../../redux/ticketDetail/actions';
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
import { useParams } from 'react-router-dom';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import clone from 'clone';
import axios from 'axios';
// const Tag = props => (
//   <TagWrapper>
//     <Tags {...props}>{props.children}</Tags>
//   </TagWrapper>
// );
class TicketDetail extends Component {
  
  state={
    users:[],
    projects:[],
  }
 async componentDidMount(){
  await this.props.getTicket(this.props.match.params['id'])
    console.log(this.props)

    await axios.get("http://127.0.0.1:8000/users/").then((response) => {
      this.setState({users: response.data})     
  });

  await axios.get("http://127.0.0.1:8000/projects/").then((response) => {
      this.setState({projects: response.data})     
  });
  }
  handleRecord = (actionName, ticket) => {
    ticket['ticketId'] = this.props.match.params['id'];
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    this.props.createTicket(ticket, actionName);
  };
  handleComment = (actionName,comment) => {
    comment['ticketId'] = this.props.match.params['id'];
    if (comment.key && actionName !== 'delete') actionName = 'update';
    this.props.createComment(comment,actionName);
  };
  handleAttachment = (actionName,attachment) => {
    console.log(attachment)
    attachment['ticketId'] = this.props.match.params['id'];
    if (attachment.key && actionName !== 'delete') actionName = 'update';
    this.props.uploadAttachment(attachment,actionName);
  };
  handleModal = (ticket = null) => {
    console.log(ticket[0])
    this.props.toggleModalTicketDetail(ticket[0]);
  };
  onRecordChange = (key, event) => {
    let { ticket_edit,comment } = clone(this.props);
    if (key) ticket_edit[key] = event.target.value;
    this.props.update(ticket_edit);
  };

  onSelectChange = (key, value) => {
    let { ticket_edit } = clone(this.props);
    if (key) ticket_edit[key] = value;
    this.props.update(ticket_edit);
  };

  onAttachment = (key,event) => {
    let { ticket_edit,update } = clone(this.props);
    let files=[]
    if(event.fileList.length!=0){
      for (let i=0 ; i< event.fileList.length;i++){
        files.push({file:event.fileList[i].originFileObj,name:event.fileList[i].originFileObj.name});
      }
      let file;
        var reader = new FileReader();
        file=files[files.length-1]
        reader.onload = () => {
          console.log(file)
          ticket_edit.attachments.push({reader:reader.result,name:file.name});
          update(ticket_edit);
          console.log(ticket_edit)
        }
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        reader.readAsDataURL(file.file);
        
    }
  //  if (key) ticket_edit[key] = event.fileList;
  //  this.props.update(ticket_edit);
  }
  checkValue = ()=>{
    const { ticket_edit } = clone(this.props);
    if (ticket_edit.assignedUser != null && ticket_edit.assignedUser['name']){
      return ticket_edit.assignedUser['name']
    }
    else{
      return ticket_edit.assignedUser
    }
  }

  checkValueProject = ()=>{
    const { ticket_edit } = clone(this.props);
    if (ticket_edit.project != null && ticket_edit.project['title']){
      return ticket_edit.project['title']
    }
    else{
      return ticket_edit.project
    }
  }


  render() {
    
    if(this.props.isLoading){
      return <p>loading...</p>
    }
    else {
      const { rowStyle, colStyle, gutter } = basicStyle;
      const {ticket_detail,ticket_edit,modalActiveTicketDetail,comments,attachments} = this.props
      // console.log(ticket_detail)
      let createDate = new Date(`${ticket_detail[0].created_at}`)
      let updateDate = new Date(`${ticket_detail[0].updated_at}`)
      const CommentDataSource = [];
      const attachmentDataSource=[];
      // console.log(ticket_edit)
      Object.keys(comments).map((comment, index) => {
        return CommentDataSource.push({
          ...comments[comment],
          key: comment,
        });
      });
      Object.keys(attachments).map((attachment, index) => {
        return attachmentDataSource.push({
          ...attachments[attachment],
          key: attachment,
        });
      });
      
      // console.log(ticket_detail[0]['id'])
      // let dataSource=[{'commenter': 'hello','message':'firest message'}]
      let dataSource2=[{'property': 'user assigned','oldVal':'Abebe','newVal':'Kebede','updatedAt':'25/25/22'}]
      // let dataSource3=[{'file': 'link to file','notes':'thie is a screenshot the first screenshot','uploader':'Kebede','uploadedAt':'25/25/22'}]
      const commentColumns = [
        {
          title: 'Commenter',
          dataIndex: 'commenter',
          key: 'commenter',
          width: '170px',
          sorter: (a, b) => {
            if (a.commenter < b.commenter) return -1;
            if (a.commenter > b.commenter) return 1;
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
            return trimByWord(row.commenter);
          },
        },
        {
          title: 'Message',
          dataIndex: 'message',
          key: 'message',
          width: '230px',
          sorter: (a, b) => {
            if (a.message < b.message) return -1;
            if (a.message > b.message) return 1;
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
            return trimByWord(row.message);
          },
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
          width: '170px',
          sorter: (a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
            return 0;
          },
          render: (text, row) => {
            let date = new Date(`${row.created_at}`)
            const trimByWord = sentence => {
              let result = sentence;
              let resultArray = result.split(' ');
              if (resultArray.length > 7) {
                resultArray = resultArray.slice(0, 7);
                result = resultArray.join(' ') + '...';
              }
              return date.toLocaleString();
            };
            return trimByWord(row.created_at);
          },
        },
        {
          title: 'Actions',
          key: 'action',
          width: '10px',
          className: 'noWrapCell',
          render: (text, row) => {
            return (
              <ActionWrapper>
                {/* <a  href="# ">
                  <i className="ion-android-create" />
                </a> */}
  
                <Popconfirms
                  title="Are you sure to delete this project？"
                  okText="Yes"
                  cancelText="No"
                  placement="topRight"
                  onConfirm={this.handleComment.bind(this, 'delete', row)}
                >
                  <a className="deleteBtn" href="# ">
                    <i className="ion-android-delete" />
                  </a>
                </Popconfirms>
              </ActionWrapper>
            );
          },
        },
      ];
      
      return (
        <LayoutWrapper>
        
            <Modal
              visible={modalActiveTicketDetail}
              onClose={this.handleModal.bind(this, null)}
              title={'Update Ticket'}
              okText={'Update Ticket' }
              onOk={this.handleRecord.bind(this, 'update', ticket_edit)}
              onCancel={this.handleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Title</Label>
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={ticket_edit.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={ticket_edit.description}
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
                            value={ticket_edit.priority}
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
                        defaultValue={ticket_edit.status}
                        placeholder="Enter Status"
                        onChange={this.onSelectChange.bind(this, 'status')}
                        // style={{ width: '50%' }}
                      >
                        <Option value="draft">Draft</Option>
                        <Option value="publish">Publish</Option>
                      </Select>
                    </Fieldset>
                  </Col>
                </Row>
              </Form>
            </Modal>
  
                <ContentHolder>
                <Row style={rowStyle} gutter={0} justify="start">
                  <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
                    <IsoWidgetsWrapper>
                      {/* Sticker Widget */}
                      <StickerWidget
                        number={<IntlMessages id="widget.stickerwidget1.number" />}
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
                        number={<IntlMessages id="widget.stickerwidget1.number" />}
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
                        number={<IntlMessages id="widget.stickerwidget1.number" />}
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
                      <a onClick={this.handleModal.bind(this, ticket_detail)}  href="# ">
                        {<IntlMessages id="edit" />}
                      </a>
                    }
                    style={{ width: '100%' }}
                  >
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Ticket Title" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].title}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Ticket Description" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].description}`} />}</p>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Assigned Person" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].assignedUser['name']}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Project" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].project.title}`} />}</p>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Priority" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].priority}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Status" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].status}`} />}</p>
                        </Col>
                    </Row>
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
                      columns={commentColumns}
                      bordered={true}
                      dataSource={CommentDataSource}
                      loading={this.props.isLoading}
                      className="isoSimpleTable"
                      pagination={{
                        defaultPageSize: 4,
                        hideOnSinglePage: true,
                        total: CommentDataSource.length,
                        showTotal: (total, range) => {
                          return `Showing ${range[0]}-${range[1]} of ${CommentDataSource.length
                            } Results`;
                        },
                      }}
                    />     
                  </Card>
                  
                </ContentHolder>
           
          </LayoutWrapper>
      );
    }
  }
}

export default connect(
  state => ({
    ...state.TicketDetail,
  }),
  actions
)(TicketDetail);