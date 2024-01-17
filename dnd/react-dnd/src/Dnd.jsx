import React from 'react';

const DragAndDrop = () => {
  const iteration = 100;
  let currentIteration = 0;

  const dropTargetMapping = {
    'demo-1': 'droptarget-1',
    'demo-2': 'droptarget-2',
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('Text-1', 'demo-1');
    event.dataTransfer.setData('Text-2', 'demo-2');
    document.getElementById(event.target.id).style.opacity = 0.2;
    document.getElementById(dropTargetMapping[event.target.id]).style.color =
      'red';
    document.getElementById(dropTargetMapping[event.target.id]).style.border =
      '3px dotted red';
  };

  const handleDrag = (event) => {
    if (currentIteration % iteration === 0) {
      const rect = event.target.getBoundingClientRect();
      console.log(dropTargetMapping[event.target.id], event.target.id, rect);
    }
    currentIteration++;
  };

  const handleDragEnd = (event) => {
    const dropZone = document.getElementById(dropTargetMapping[event.target.id]);
    if (dropZone && dropZone.innerText !== 'Dropped!') {
      event.target.style.opacity = '1';
      dropZone.style.color = 'black';
      dropZone.style.border = '';
    }
  };

  const handleDragEnter = (event) => {
    console.log('drag enter:', event.target.className, event.target.id);
    document.getElementById(event.target.id).style.color = 'red';
    document.getElementById(event.target.id).style.border = '3px dotted red';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    if (
      event.target.className === 'droptarget-1' ||
      event.target.className === 'droptarget-2'
    ) {
      event.target.style.color = 'black';
      event.target.style.border = '';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const targetId = event.target.className.charAt(
      event.target.className.length - 1
    );
    const dropZone = document.getElementById(event.target.id);
    dropZone.style.color = '';
    dropZone.style.border = '';
    const data = event.dataTransfer.getData(`Text-${targetId}`);
    dropZone.innerText = 'Dropped!';
    dropZone.appendChild(document.getElementById(data));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: '100vh',
      }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p
          id="demo-1"
          draggable="true"
          style={{
            backgroundColor: 'yellow',
            border: '1px solid black',
            width: '75px',
            margin: '20px 50px',
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}>
          Drag me 1!
        </p>
        <p
          id="demo-2"
          draggable="true"
          style={{
            backgroundColor: 'yellow',
            border: '1px solid black',
            width: '75px',
            margin: '20px 50px',
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}>
          Drag me 2!
        </p>
      </div>
      {/* <img id="testImage" src="https://www.w3schools.com/js/pic_bulbon.gif" width="30" alt="testImage" /> */}

      <div style={{ display: 'flex' }}>
        <div
          className="droptarget-1"
          style={{ width: '200px', margin: '30px auto', height: '200px' }}
          id="droptarget-1"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          Drop 1 here!
        </div>
        <div
          className="droptarget-2"
          style={{ width: '200px', margin: '30px auto', height: '200px' }}
          id="droptarget-2"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          Drop 2 here!
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
