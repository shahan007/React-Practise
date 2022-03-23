import { Modal,Tooltip} from 'antd';
import GoogleMapReact from 'google-map-react';
import MapMarkerImage from "./map-marker.svg"

const Marker = ({text}) => (
    <div>
        <Tooltip placement='top' title={text}>
            <img src={MapMarkerImage} alt={text}/>
        </Tooltip>
    </div>
)

const Map = (props) => {
    
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

export default Map;    