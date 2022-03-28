import { Collapse, Comment, Tooltip, List,Pagination,Row,Grid} from "antd"
import Loader from "../Loader/Loader";
import moment from "moment"
const { Panel } = Collapse;
const { useBreakpoint } = Grid

const Comments = (props) => {
    
    const { md } = useBreakpoint()

    return (
        <Collapse                 
            defaultActiveKey={props.showComment && ['1']} 
            style={{
                "marginBottom": "20px"
            }}
        >
            <Panel header="Comments" key="1">
                {
                    props.commentLoading ?
                    <Loader height="10vh"/>:
                    <>
                        < List
                            className="comment-list"
                            header={`${props.commentCount} comments`}
                            itemLayout="horizontal"
                            dataSource={props.comments}
                            renderItem={comment => (
                                <li key={comment.id}>
                                    <Comment                                        
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
                                showSizeChanger={md ? true : false}
                                showQuickJumper={md ? true : false}
                                pageSize={props.commentPageStatus.commentsPerPage}
                                pageSizeOptions={[2, 4, 8]}
                                defaultCurrent={props.commentPageStatus.currentPage}
                                total={props.commentCount}
                                onChange={props.navigateToPage}
                            />
                        </Row>
                    </>                    
                }
            </Panel>
        </Collapse>            
    )
}

export default Comments

