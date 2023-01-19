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

const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);

class Tickets extends Component {
  async componentDidMount() {
    await this.props.getTickets();
  }
  handleRecord = (actionName, ticket) => {
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(ticket, actionName);
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
        // width: '360px',
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
      // {
      //   title: 'Project',
      //   dataIndex: 'project',
      //   key: 'project',
      //   // width: '220px',
      //   sorter: (a, b) => {
      //     if (a.excerpt < b.excerpt) return -1;
      //     if (a.excerpt > b.excerpt) return 1;
      //     return 0;
      //   },
      //   render: (text, row) => {
      //     const trimByWord = sentence => {
      //       let result = sentence;
      //       let resultArray = result.split(' ');
      //       if (resultArray.length > 8) {
      //         resultArray = resultArray.slice(0, 8);
      //         result = resultArray.join(' ') + '...';
      //       }
      //       return result;
      //     };

      //     return trimByWord(row.excerpt);
      //   },
      // },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: '100px',
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
          if (row.status === ('draft' || 'Draft' || 'DRAFT')) {
            className = 'draft';
          } else if (row.status === ('publish' || 'Publish' || 'PUBLISH')) {
            className = 'publish';
          }
          return <StatusTag className={className}>{row.status}</StatusTag>;
        },
      },
      {
        title: 'Actions',
        key: 'action',
        width: '60px',
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
                  Add new record
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
                  <Textarea
                    label="assignedPerson"
                    rows={5}
                    placeholder="Enter excerpt"
                    value={ticket.excerpt}
                    onChange={this.onRecordChange.bind(this, 'assignedPerson')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Slug</Label>

                  <Input
                    label="Slug"
                    placeholder="Enter Slugs"
                    value={ticket.slug}
                    onChange={this.onRecordChange.bind(this, 'slug')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Status</Label>
                  <Select
                    defaultValue={ticket.status}
                    placeholder="Enter Status"
                    onChange={this.onSelectChange.bind(this, 'status')}
                    style={{ width: '170px' }}
                  >
                    <Option value="draft">Draft</Option>
                    <Option value="publish">Publish</Option>
                  </Select>
                </Fieldset>
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
