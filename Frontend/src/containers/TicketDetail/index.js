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
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    this.props.createTicket(ticket, actionName);
  };
  handleComment = (comment) => {
    this.props.createComment(comment);
  };
  handleAttachment = (attachment) => {
    this.props.uploadAttachment(attachment);
  };
  handleModal = (ticket = null) => {
    console.log(ticket[0])
    this.props.toggleModal(ticket[0]);
  };
  onRecordChange = (key, event) => {
    let { ticket_edit,comment } = clone(this.props);
    ticket_edit['ticketId'] = this.props.match.params['id'];
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
    console.log(event.fileList[0].originFileObj.name)
    let files=[]
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
      const {ticket_detail,ticket_edit,modalActive,comments,comment} = this.props
      // console.log(ticket_edit)
      const CommentDataSource = [];
      // console.log(ticket_edit)
      Object.keys(comments).map((comment, index) => {
        return CommentDataSource.push({
          ...comments[comment],
          key: comment,
        });
      });
      
      // console.log(ticket_detail[0]['id'])
      // let dataSource=[{'commenter': 'hello','message':'firest message'}]
      let dataSource2=[{'property': 'user assigned','oldVal':'Abebe','newVal':'Kebede','updatedAt':'25/25/22'}]
      let dataSource3=[{'file': 'link to file','notes':'thie is a screenshot the first screenshot','uploader':'Kebede','uploadedAt':'25/25/22'}]
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
          width: '230px',
          sorter: (a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
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
            return trimByWord(row.created_at);
          },
        },
        // {
        //   title: 'Actions',
        //   key: 'action',
        //   width: '50px',
        //   className: 'noWrapCell',
        //   render: (text, row) => {
        //     return (
        //       <ActionWrapper>
        //         <a  href="# ">
        //           <i className="ion-android-create" />
        //         </a>
  
        //         <Popconfirms
        //           title="Are you sure to delete this project？"
        //           okText="Yes"
        //           cancelText="No"
        //           placement="topRight"
            
        //         >
        //           <a className="deleteBtn" href="# ">
        //             <i className="ion-android-delete" />
        //           </a>
        //         </Popconfirms>
        //       </ActionWrapper>
        //     );
        //   },
        // },
      ];
      const historyColumns = [
        {
          title: 'Property',
          dataIndex: 'property',
          key: 'property',
          // width: '170px',
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
            return trimByWord(row.property);
          },
        },
        {
          title: 'Old Value',
          dataIndex: 'oldVal',
          key: 'oldVal',
          // width: '230px',
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
            return trimByWord(row.oldVal);
          },
        },
        {
          title: 'New Value',
          dataIndex: 'newVal',
          key: 'newVal',
          // width: '230px',
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
            return trimByWord(row.newVal);
          },
        },
        {
          title: 'Date Changed',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          // width: '230px',
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
            return trimByWord(row.updatedAt);
          },
        },
        
      ];
      const attachmentColumns = [
        {
          title: 'File',
          dataIndex: 'file',
          key: 'file',
          // width: '170px',
          sorter: (a, b) => {
            if (a.file < b.file) return -1;
            if (a.file > b.file) return 1;
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
            return trimByWord(row.file);
          },
        },
        {
          title: 'Uploader',
          dataIndex: 'uploader',
          key: 'uploader',
          // width: '230px',
          sorter: (a, b) => {
            if (a.uploader < b.uploader) return -1;
            if (a.uploader > b.uploader) return 1;
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
            return trimByWord(row.uploader);
          },
        },
        {
          title: 'Notes',
          dataIndex: 'notes',
          key: 'notes',
          // width: '230px',
          sorter: (a, b) => {
            if (a.notes < b.notes) return -1;
            if (a.notes > b.notes) return 1;
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
            return trimByWord(row.notes);
          },
        },
        {
          title: 'Uploaded At',
          dataIndex: 'uploadedAt',
          key: 'uploadedAt',
          // width: '230px',
          sorter: (a, b) => {
            if (a.uploadedAt < b.uploadedAt) return -1;
            if (a.uploadedAt > b.uploadedAt) return 1;
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
            return trimByWord(row.uploadedAt);
          },
        },
        
      ];
      return (
        <LayoutWrapper>
          {/* <PageHeader>{<IntlMessages id="uiElements.cards.cards" />}</PageHeader> */}
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={12} sm={12} xs={24} style={colStyle}>
            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={'Update Ticket'}
              okText={'Update Ticket' }
              onOk={this.handleRecord.bind(this, 'update', ticket_edit)}
              onCancel={this.props.toggleModal.bind(this, null)}
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
                            <p>{<IntlMessages id={`${ticket_detail[0].created_at}`} />}</p>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <strong>{<IntlMessages id="Updated At" />}</strong>
                            <p>{<IntlMessages id={`${ticket_detail[0].updated_at}`} />}</p>
                        </Col>
                    </Row>       
                  </Card>
                </ContentHolder>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
  
                <ContentHolder>
                  <Card
                    title={<IntlMessages id="Comments" />}
                    bordered={false}
                    style={{ width: '100%' }}
                  >
                    <Form>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={21} sm={18} xs={24} style={colStyle}>
                          <Fieldset style={{'marginBottom':'5px'}}>
                          <Textarea
                              label="Message"
                              placeholder="Enter Message"
                              rows={3}
                              value={ticket_edit.message}
                              onChange={this.onRecordChange.bind(this, 'message')}
                        />
                          </Fieldset>
                      </Col>
                      <Col md={3} sm={6} xs={24} style={colStyle}>
                          <ButtonHolders>
                            <ActionBtn
                              type="primary"
                              onClick={this.handleComment.bind(this, ticket_edit)}
                            >
                                Comment
                            </ActionBtn>
                          </ButtonHolders>
                      </Col>
                    </Row>
                    </Form>
                    <TableWrapper
                      rowKey="key"
                      // rowSelection={rowSelection}
                      columns={commentColumns}
                      bordered={true}
                      dataSource={CommentDataSource}
                      loading={this.props.isLoading}
                      className="isoSimpleTable"
                      pagination={{
                        // defaultPageSize: 1,
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
  
            </Col>
          </Row>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={12} sm={12} xs={24} style={colStyle}>
  
                <ContentHolder>
                  <Card
                    title={<IntlMessages id="History" />}
                  //   extra={
                  //     <a href="# ">
                  //       {<IntlMessages id="uiElements.cards.more" />}
                  //     </a>
                  //   }
                    style={{ width: '100%' }}
                  >
                    <TableWrapper
                      rowKey="key"
                      // rowSelection={rowSelection}
                      columns={historyColumns}
                      bordered={true}
                      dataSource={dataSource2}
                      loading={this.props.isLoading}
                      className="isoSimpleTable"
                      pagination={{
                        defaultPageSize: 1,
                        hideOnSinglePage: true,
                        total: dataSource2.length,
                        showTotal: (total, range) => {
                          return `Showing ${range[0]}-${range[1]} of ${dataSource2.length
                            } Results`;
                        },
                      }}
                    />
                  </Card>
                </ContentHolder>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
  
                <ContentHolder>
                  <Card
                    title={<IntlMessages id="Attachments" />}
                    bordered={false}
                    style={{ width: '100%' }}
                  >
                    <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={6} sm={6} xs={24} style={colStyle}>
                      <Upload
                      beforeUpload={() => false}
                      onChange={
                        this.onAttachment.bind(this, 'profile_image')}
                        >
                        <button>
                            <Icon type="upload" className="avatar-uploader-trigger" /> Upload File
                        </button>
                      </Upload>
                      </Col>
                      <Col md={16} sm={15} xs={24} style={colStyle}>
                          <Fieldset style={{'marginBottom':'5px'}}>
                          <Input
                              label="Note"
                              placeholder="Enter Note"
                              value={ticket_edit.note}
                              onChange={this.onRecordChange.bind(this, 'note')}
                            />
                          </Fieldset>
                      </Col>
                      <Col md={2} sm={6} xs={24} style={colStyle}>
                          <ButtonHolders>
                            <ActionBtn
                              type="primary"
                              onClick={this.handleAttachment.bind(this, ticket_edit)}
                            >
                                Add
                            </ActionBtn>
                          </ButtonHolders>
                      </Col>
                    </Row>
                   
                   <TableWrapper
                      rowKey="key"
                      // rowSelection={rowSelection}
                      columns={attachmentColumns}
                      bordered={true}
                      dataSource={dataSource3}
                      loading={this.props.isLoading}
                      className="isoSimpleTable"
                      pagination={{
                        defaultPageSize: 1,
                        hideOnSinglePage: true,
                        total: dataSource3.length,
                        showTotal: (total, range) => {
                          return `Showing ${range[0]}-${range[1]} of ${dataSource3.length
                            } Results`;
                        },
                      }}
                    />
                  </Card>
                </ContentHolder>
  
            </Col>
          </Row>
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