import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Card from 'react-bootstrap/Card';
export default function Messaging() {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({})
    const [desc, setDesc] = useState()
    const [title, setTitle] = useState()
    const [userType, setUserType] = useState([])
    const [notification, setNotification] = useState([])

    useEffect(() => {
        getnotification()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getdata = (option) => {

        if (option === "Shippers") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
                .then(response => {
                    const shippersdata = response.data.users.filter(user => user.role === "Shipper")
                    const uniqueDeviceIds = shippersdata.map(user => user.uniqueDeviceId);
                    setUserType(uniqueDeviceIds)
                    console.log(uniqueDeviceIds);

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (option === "Transporters") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
                .then(response => {
                    const transportersdata = response.data.users.filter(user => user.role === "Transporter")
                    const uniqueDeviceIds = transportersdata.map(user => user.uniqueDeviceId);
                    setUserType(uniqueDeviceIds)
                    console.log(uniqueDeviceIds);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        } else if (option === "Agents") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
                .then(response => {
                    const Agentsdata = response.data.users.filter(user => user.role === "Agent")
                    const uniqueDeviceIds = Agentsdata.map(user => user.uniqueDeviceId);
                    setUserType(uniqueDeviceIds)
                    console.log(uniqueDeviceIds);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        } else if (option === "FleetOwner") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
                .then(response => {
                    const Fleetdata = response.data.users.filter(user => user.role === "Fleet Owner")
                    const uniqueDeviceIds = Fleetdata.map(user => user.uniqueDeviceId);
                    setUserType(uniqueDeviceIds)
                    console.log(uniqueDeviceIds);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        }
        else if (option === "All") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
                .then(response => {
                    const Alldata = response.data.users
                    const uniqueDeviceIds = Alldata.map(user => user.uniqueDeviceId);
                    setUserType(uniqueDeviceIds)
                    console.log(uniqueDeviceIds);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        }
    }

    const handleMessage = async () => {

        const body = {
            title: title,
            description: desc,
            externalId: userType
        }
        const result = await axios.post("https://motionless-cowboy-hat-ant.cyclic.app/admin/sendMessages", body)
        try {
            if (result) {
                console.log(result.data.message)
                setMessage(result.data.messsageDetails)
            }
        } catch (err) {
            console.log("Error")
        }
    }
    
    const getnotification = async () => {
        await axios
            .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allNotifications')
            .then(response => {
                const result = response.data.notifications
                setNotification(result)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    console.log(notification)
    return (
        <>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                {/* <button > CreateMessage</button> */}
                <Button onClick={handleShow} variant="light" style={{ backgroundColor: "#F58E26", color: "white", margin: '2rem' }}>
                    Create Message
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    autoFocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >

                                <Form.Control as="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Description/Message" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >

                                <select style={{ width: '30.5vw', height: "40px", borderRadius: '10px' }} onChange={(e) => getdata(e.target.value)} >
                                    <option selected> Send to</option>
                                    <option value="All"> All</option>
                                    <option value="Shippers">Shippers</option>
                                    <option value="Transporters">Transporters</option>
                                    <option value="Agents">Agents</option>
                                    <option value="FleetOwner">FleetOwner</option>

                                </select>
                                <h6 style={{ marginTop: '10px' }}>Notification/Frequency</h6>
                                <Form.Control type="date" style={{ padding: '10px', width: '150px' }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer style={{marginRight:'130px'}}> */}
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '190px', marginBottom: '20px' }}>
                        <Button style={{ backgroundColor: '#FFF', color: 'black', marginRight: '30px' }} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button style={{ backgroundColor: '#F58E26' }} onClick={handleMessage}>
                            Send
                        </Button>
                    </div>
                    {/* </Modal.Footer> */}
                </Modal>
            </div>
            <div style={{}}>
                
                    
                        {notification.map((item, index) => {
                            return (
                                <Card className="container" style={{marginBottom:'20px', width:'800px'}}>
                                    <h4 style={{ color: "#F58E26", marginTop:'10px' }}>Truk App</h4>
                                    <p style={{fontWeight:'bold'}}>To:{item.to}</p>
                                    <p style={{fontWeight:'bold'}}>{item.title}</p>
                                    <p style={{fontWeight:'bold'}}>{item.description}</p>
                                    <h7 style={{ textAlign: 'right', fontWeight:'bold' }}>{item.time}</h7>
                                </Card>

                            )

                        })}
                        {/* <p>title</p>
                        <p>description</p>
                        <h6 style={{ textAlign: 'right' }}>time</h6> */}
                    
                
            </div>
        </>
    )
}