import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function Sidebar({ addNode, updateNode, deleteNode, selectedNode }) {
  // Local state for the "Add Node" form
  const [newNodeLabel, setNewNodeLabel] = useState('');

  // Local state for the "Edit Node" form
  const [editLabel, setEditLabel] = useState('');

  // When selectedNode changes, update the edit form's text
  useEffect(() => {
    if (selectedNode) {
      setEditLabel(selectedNode.data.label);
    } else {
      setEditLabel(''); // Clear the form if no node is selected
    }
  }, [selectedNode]);

  // Handler for the "Add Node" form submission
  const handleAddNode = (e) => {
    e.preventDefault(); // Prevent form from refreshing page
    if (!newNodeLabel) return; // Don't add empty nodes
    addNode(newNodeLabel);
    setNewNodeLabel(''); // Clear the input
  };

  // Handler for the "Update Node" form submission
  const handleUpdateNode = (e) => {
    e.preventDefault();
    if (!editLabel || !selectedNode) return;
    updateNode(selectedNode.id, editLabel);
  };

  // Handler for the "Delete Node" button
  const handleDeleteNode = () => {
    if (!selectedNode) return;
    deleteNode(selectedNode.id);
  };

  return (
    <Card>
      <Card.Body>
        {/* Show the Edit/Delete form ONLY if a node is selected */}
        {selectedNode ? (
          <>
            <Card.Title>Edit Node</Card.Title>
            <Alert variant="info" className="small p-2">
              Editing: <strong>{selectedNode.data.label}</strong> (ID: {selectedNode.id})
            </Alert>
            <Form onSubmit={handleUpdateNode}>
              <Form.Group className="mb-3">
                <Form.Label>Node Label</Form.Label>
                <Form.Control
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Update Node
                </Button>
                <Button variant="danger" onClick={handleDeleteNode}>
                  Delete Node
                </Button>
              </div>
            </Form>
          </>
        ) : (
          /* Show the "Add Node" form if no node is selected */
          <>
            <Card.Title>Add a New Node</Card.Title>
            <Form onSubmit={handleAddNode}>
              <Form.Group className="mb-3">
                <Form.Label>Node Label</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a label"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="success" type="submit">
                  Add Node
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default Sidebar;