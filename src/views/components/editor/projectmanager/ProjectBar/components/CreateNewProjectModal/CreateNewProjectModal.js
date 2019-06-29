import React, { useState } from 'react';

import { Modal } from 'views/components/Modal';

export default ({ onSubmit }) => {
  const [visiblity, setVisibility] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleClose = () => {
      setVisibility(false);
  }

  const handleSubmit = () => {
    onSubmit({
      projectName,
      projectDescription
    });

    setProjectName('');
    setProjectDescription('');
    setVisibility(false);
  }

  return (
    <>
      {/* OPEN MODAL BUTTON*/}
      <div>
        <button onClick={() => setVisibility(true)} style={{width: 60, margin: 10, fontWeight: "bold"}}>+</button>
      </div>

      {/* MODAL */}
      {
        (visiblity)
        ? <Modal
            type="form"
            width={500}
            isVisible={true}
            onClose={handleClose}
            onSubmit={handleSubmit}
          >
            <form>
              <label htmlFor="project_name">NAME</label>
              <input type="text" name="project_name" placeholder="Name" style={{width: "100%"}} value={projectName} onChange={(e) => { setProjectName(e.target.value)}} />

              <label htmlFor="project_description">DESCRIPTION</label>
              <textarea type="text" name="project_description" placeholder="Description" style={{width: "100%"}} value={projectDescription} onChange={(e) => { setProjectDescription(e.target.value)}} />
            </form>
          </Modal>
        : null
      }
    </>
  )
}
