import { Collapse, Comment, Tooltip, List,Pagination,Row} from "antd"
import moment from "moment"
const { Panel } = Collapse;

const Comments = (props) => {
    
    return (
        <Collapse                 
            defaultActiveKey={['1']} 
            style={{
                "marginBottom": "20px"
            }}
        >
            <Panel header="Comments" key="1">
                < List
                    className="comment-list"
                    header={`${props.commentCount} comments`}
                    itemLayout="horizontal"
                    dataSource={props.comments}
                    renderItem={comment => (
                        <li>
                            <Comment                            
                                // actions={item.actions} -- disabled this
                                author={
                                    <Tooltip title={comment.email}>
                                        <span>{comment.email.split("@")[0]}</span>
                                    </Tooltip>                                    
                                }
                                avatar={
                                    `https://ui-avatars.com/api/?name=${comment.email.split("@")[0]}`
                                }
                                content={comment.body}
                                // mocking datetime since the json-server didnt have any datetime field
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        </li>
                    )}
                />                    
                <Row
                    style={{
                        "justifyContent": "center",
                        "alignItems": "center",
                        "padding": "30px 0"
                    }}
                >
                    <Pagination
                        showQuickJumper
                        pageSize={props.commentPageStatus.commentsPerPage}
                        pageSizeOptions={[2, 4, 8]}
                        defaultCurrent={props.commentPageStatus.currentPage}
                        total={props.commentCount}
                        onChange={props.navigateToPage}
                    />                
                </Row>
            </Panel>
        </Collapse>            
    )
}

export default Comments

