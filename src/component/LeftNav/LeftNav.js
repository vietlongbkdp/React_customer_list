import {FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, fas, faTrash} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Pagination from 'react-bootstrap/Pagination';
library.add(fas, faTrash, faPenToSquare)
// import Modal from 'react-bootstrap/Modal';

export  default function LeftNav(){
    const itemPerPage = 5
    const [loadpage, setLoadpage] = useState(false)
    // const [pageInfo, setPageInfo] = useState({
    //     totalPage: 1,
    //     activePage: 1
    // })
    let totalPage = 0;
    const activePage = 1
    const [listUser, setListUser] = useState([])
    const [user, setUser] = useState({
        fullName:'',
        gender: "ALL",
        age: 100
    })
    let items = [];

    useEffect( () => {
        async function fetchAllUser() {
          const response = await axios.get("https://6582c12b02f747c8367a1e1a.mockapi.io/customer")
          const users = response.data
            setListUser(users)
        }
    fetchAllUser()
    }, [loadpage])
    const handleChangeAge = (event)=>{
        setUser({
            ...user,
            age: parseInt(event.target.value)
        })
    }
    const handleChangeGender = (event) =>{
        setUser({
            ...user,
            gender: event.target.value
        })
    }
    const handleChangeSearch = (event) =>{
        setUser({
            ...user,
            fullName: event.target.value
        })
    }
    function filter(){
        const listUsersGender = [];
        const listUserAge = [];
        const listUserName = [];
        listUser.forEach((value) =>{
            if(user.gender === "ALL"){
                listUsersGender.push(value)
            }else if(user.gender === value.gender){
                listUsersGender.push(value)
            }
        })
        listUsersGender.forEach((value) =>{
            if(user.age === 100){
                listUserAge.push(value)
            }else if(user.age === 50 && value.age > 40){
                listUserAge.push(value)
            }else if(user.age === 20 && value.age <20){
                listUserAge.push(value)
            }else if(user.age > value.age && user.age - 10 <= value.age){
                listUserAge.push(value)
            }
        })
        listUserAge.forEach((value) =>{
            if(value.fullName.toLowerCase().includes(user.fullName.toLowerCase())){
                listUserName.push(value)
            }
        })
        return listUserName
    }
    totalPage =Math.ceil(filter().length/itemPerPage)
    console.log(totalPage)
    async function handleBtnDeleteItem(id) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn xoá")){
            await axios.delete("https://6582c12b02f747c8367a1e1a.mockapi.io/customer/" + id)
                .then(() => {
                    setLoadpage(prevState => !prevState)
                })
        }
    }
    const handleClickCreate = () =>{

    }
    const handleClickDelete = () =>{

    }
    for (let number = 0; number < totalPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage-1}>
                {number+1}
            </Pagination.Item>,
        );
    }
    return(
        <>
            <div>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container fluid className={"bg-primary-subtle p-2"}>
                        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#" disabled>
                                    Link
                                </Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={user.name}
                                    onChange={handleChangeSearch}
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-2"} style={
                        {
                            borderRight: "solid",
                            borderWidth: 0.5,
                            borderColor: "lightgray"
                        }
                    }>
                        <div>
                            <FormControl>
                                <h4 id="demo-radio-buttons-group-label" style={{marginTop: 10}}>Gender</h4>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="all"
                                    value={user.gender}
                                    name="radio-buttons-group"
                                    onChange={handleChangeGender}
                                >
                                    <FormControlLabel value="ALL" control={<Radio/>} label="All"/>
                                    <FormControlLabel value="FEMALE" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="MALE" control={<Radio/>} label="Male"/>
                                    <FormControlLabel value="OTHER" control={<Radio/>} label="Other"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <h4 id="demo-radio-buttons-group-label" style={{marginTop: 10, marginBottom: 25}}>Age</h4>
                            <FormControl style={{width: 150}}>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={user.age}
                                    label="Age"
                                    onChange={handleChangeAge}
                                >
                                    <MenuItem value={100}> All </MenuItem>
                                    <MenuItem value={20}> &lt; 20 </MenuItem>
                                    <MenuItem value={30}>20 - 30</MenuItem>
                                    <MenuItem value={40}>30 - 40</MenuItem>
                                    <MenuItem value={50}> > 40 </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={"col-10"}>
                        <div className={"d-flex justify-content-between"}>
                            <h4 id="demo-radio-buttons-group-label" style={{marginTop: 10}}>Table of Information User</h4>
                           <div>
                               <Button variant="success" style={{marginRight:10}} onClick={handleClickCreate}>Create</Button>{' '}
                               <Button variant="danger" onClick={handleClickDelete}>Delete</Button>{' '}
                           </div>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th style={{textAlign:"center"}}>#</th>
                                <th style={{textAlign:"center"}}>Full Name</th>
                                <th style={{textAlign:"center"}}>Age</th>
                                <th style={{textAlign:"center"}}>Gender</th>
                                <th style={{textAlign:"center"}}>Address</th>
                                <th colSpan={2}  style={{textAlign:"center"}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                filter().map((value, index)=> (
                                    <tr key={index}>
                                        <td style={{textAlign:"center"}}><input type={"checkbox"} /></td>
                                        <td>{value.fullName}</td>
                                        <td style={{textAlign:"center"}}>{value.age}</td>
                                        <td style={{textAlign:"center"}}>{value.gender}</td>
                                        <td>{value.address}</td>
                                        <td style={{textAlign:"center", color: "darkgreen"}}><FontAwesomeIcon icon={faPenToSquare} /></td>
                                        <td style={{textAlign:"center", color: "darkred"}} onClick={()=>{
                                            handleBtnDeleteItem(value.id)
                                        }}><FontAwesomeIcon icon={faTrash} /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        <div>
                            <div>
                                <Pagination>{items}</Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}