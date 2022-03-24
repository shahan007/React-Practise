import GoogleMapReact from 'google-map-react';
import MapMarkerImage from "./map-marker.svg"
import { Link } from 'react-router-dom';
import { Modal, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// *markers
const Marker = ({text}) => (
    
    <Tooltip placement='top' title={text}>
        <img src={MapMarkerImage} alt={text}/>
    </Tooltip>
    
)

const UserMarker = ({ user }) => (
    <Tooltip
        title={user.username}
        placement="top"
    >
        <Link to={`/users/${user.id}`} state={{ "user": user }} >
            <Avatar icon={<UserOutlined />} src={`https://ui-avatars.com/api/?name=${user.name}`} />
        </Link>
    </Tooltip>
)

// *Map that goes on Users page
const UsersMap = (props)=>{
        
    const {users} = props
    
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={{
                lat: Number(users[0].address.geo.lat),
                lng: Number(users[0].address.geo.lng)
            }}
            defaultZoom={11}
        >
            {
                users.map(
                    user => (
                        <UserMarker 
                            user={user} 
                            lat={user.address.geo.lat} 
                            lng={user.address.geo.lng}
                            key={user.id}
                        />
                    )
                )
            }
        </GoogleMapReact>

    )
}

// *Map that goes on User page
const ModalMap = (props) => {
    
    const handleCancel = () => {
        props.setIsMapModalVisible(false);
    };
    const Pos = {
        center: {
            lat: Number(props.lat) || 103,
            lng: Number(props.lng) || 1.3
        },
        zoom: 11
    };

    return (
        <Modal 
            title={`${props.username}'s location map`} 
            visible={props.isMapModalVisible}             
            onCancel={handleCancel}
            footer={null}
            
        >
            <div style={{ height: '40vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                    defaultCenter={Pos.center}
                    defaultZoom={Pos.zoom}
                >
                    <Marker
                        lat={Pos.center.lat}
                        lng={Pos.center.lng}
                        text={`${props.username}'s loc`}
                    />                    
                </GoogleMapReact>
            </div>
        </Modal>
    )
}

export default ModalMap;    
export { UsersMap };