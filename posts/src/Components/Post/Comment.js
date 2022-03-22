import { Collapse, Comment, Tooltip, List } from "antd"
import moment from "moment"
const { Panel } = Collapse;

const Comments = ({comments}) => {

    return (
        <Collapse
            accordion
            style={{
                "marginBottom": "20px"
            }}
        >
            <Panel header="Comments" key="1">
                < List
                    className="comment-list"
                    header={`${comments.length} comments`}
                    itemLayout="horizontal"
                    dataSource={comments}
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
            </Panel>
        </Collapse>            
    )
}

export default Comments

