import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
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
// const Tag = props => (
//   <TagWrapper>
//     <Tags {...props}>{props.children}</Tags>
//   </TagWrapper>
// );

export default class extends Component {
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    let dataSource=[{'commenter': 'hello','message':'firest message'}]
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
        title: 'Actions',
        key: 'action',
        width: '50px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a  href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this project？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
          
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

              <ContentHolder>
                <Card
                  title={<IntlMessages id="Ticket Details" />}
                  extra={
                    <a href="# ">
                      {<IntlMessages id="edit" />}
                    </a>
                  }
                  style={{ width: '100%' }}
                >
                  <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Ticket Title" />}</strong>
                          <p>{<IntlMessages id="ticket 1" />}</p>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Ticket Description" />}</strong>
                          <p>{<IntlMessages id="uiElements.cards.lorem" />}</p>
                      </Col>
                  </Row>
                  <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Assigned Person" />}</strong>
                          <p>{<IntlMessages id="Abebe" />}</p>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Project" />}</strong>
                          <p>{<IntlMessages id="project 1" />}</p>
                      </Col>
                  </Row>
                  <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Priority" />}</strong>
                          <p>{<IntlMessages id="High" />}</p>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Status" />}</strong>
                          <p>{<IntlMessages id="New" />}</p>
                      </Col>
                  </Row>
                  <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Created At" />}</strong>
                          <p>{<IntlMessages id="22/25/22" />}</p>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                          <strong>{<IntlMessages id="Updated At" />}</strong>
                          <p>{<IntlMessages id="23/88/89" />}</p>
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
                            label="Description"
                            placeholder="Enter Description"
                            rows={3}
                            // value={article.description}
                            // onChange={this.onRecordChange.bind(this, 'description')}
                      />
                        </Fieldset>
                    </Col>
                    <Col md={3} sm={6} xs={24} style={colStyle}>
                        <ButtonHolders>
                          <ActionBtn
                            type="primary"
                            // onClick={this.handleModal.bind(this, null)}
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
                      total: dataSource.length,
                      showTotal: (total, range) => {
                        return `Showing ${range[0]}-${range[1]} of ${dataSource.length
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
                    <Upload>
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
                            // value={project.title}
                            // onChange={this.onRecordChange.bind(this, 'title')}
                          />
                        </Fieldset>
                    </Col>
                    <Col md={2} sm={6} xs={24} style={colStyle}>
                        <ButtonHolders>
                          <ActionBtn
                            type="primary"
                            // onClick={this.handleModal.bind(this, null)}
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
                      total: dataSource.length,
                      showTotal: (total, range) => {
                        return `Showing ${range[0]}-${range[1]} of ${dataSource.length
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
