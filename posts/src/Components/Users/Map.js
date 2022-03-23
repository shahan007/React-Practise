import { Modal} from 'antd';

const Map = (props) => {


    const handleCancel = () => {
        props.setIsMapModalVisible(false);
    };

    return (
        <Modal 
            title="Map" 
            visible={props.isMapModalVisible}             
            onCancel={handleCancel}
            footer={null}
            
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>

    )
}

export default Map;    