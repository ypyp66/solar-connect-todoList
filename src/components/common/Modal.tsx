import { Modal } from "antd";

function Modals({ modalOpen, setModalOpen, children }) {
  return (
    <Modal
      visible={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={() => setModalOpen(false)}
    >
      {children}
    </Modal>
  );
}

export default Modals;
