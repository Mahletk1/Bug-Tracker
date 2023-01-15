import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/projects/actions';
import Input, { Textarea } from '../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import Popconfirms from '../../components/feedback/popconfirm';
import Tags from '../../components/uielements/tag';
import TagWrapper from './tag.style';
import Progress from '../../components/uielements/progress';
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
import axios from 'axios';
const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);



class Projects extends Component {
  state={
    users:[]
  }
  async componentDidMount() {
    console.log(this.props)
    await this.props.getProjects();

   await axios.get("http://127.0.0.1:8000/users/").then((response) => {
      // for (let index = 0; index < response.data.results.length; index++) {
        this.setState({users: response.data})
        // this.state.image=response.data[0].profile_image
        // console.log(response)
      
    });
  console.log(this.state.users)
    // console.log(this.props);

  }
  handleRecord = (actionName, project) => {
    if (project.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(project, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (project = null) => {
    this.props.toggleModal(project);
  };

  onRecordChange = (key, event) => {
    let { project } = clone(this.props);
    if (key) project[key] = event.target.value;
    this.props.update(project);
  };

  onSelectChange = (key, value) => {
    let { project } = clone(this.props);
    if (key) project[key] = value;
    this.props.update(project);
  };

  render() {
    const { modalActive, projects } = this.props;
    const { project } = clone(this.props);
    const dataSource = [];
    Object.keys(projects).map((project, index) => {
      return dataSource.push({
        ...projects[project],
        key: project,
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
        title: 'Progress Bar',
        dataIndex: 'progress_bar',
     
        key: 'slug',
        render: (text, row) => {
          return (
            <Progress
          percent={25}
          strokeWidth={7}
          status='active'
          showInfo={true}
        />
          )
        },
      },
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
        title: 'Actions',
        key: 'action',
        // width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this project？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
              <a>detail</a>
            </ActionWrapper>
          );
        },
      },
    ];
    function onSearch(val) {
      console.log('search:', val);
    }
    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Projects</ComponentTitle>
             

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
              title={project.key ? 'Update project' : 'Add New Project'}
              okText={project.key ? 'Update project' : 'Add Project'}
              onOk={this.handleRecord.bind(this, 'insert', project)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Title</Label>
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={project.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={project.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Assigned Person</Label>
                      <Select
                      showSearch={true}
                      onSearch={onSearch}

                      placeholder="Assigned Person"
                      onChange={(e)=>{this.onRecordChange.bind(this, 'assignedUser')}}
                      filterOption={(inputValue, option) =>
                        // console.log(option.props.children.toLowerCase().includes(inputValue.toLowerCase()),inputValue)
                        option.props.children.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      style={{ width: '100%' }}
                    > 
                    {
                      this.state.users.map((user,i)=>{
                        return <Option key={user.id} value={user.id} >{user.name}</Option>
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
                      onChange={(e)=>{this.onRecordChange.bind(this, 'priority')}}
                      style={{ width: '100%' }}
                    >  
                      <Option value='low'  >Low</Option>
                      <Option value='medium'>Meidum</Option>
                      <Option value='high'>High</Option>
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
    ...state.Projects,
  }),
  actions
)(Projects);
