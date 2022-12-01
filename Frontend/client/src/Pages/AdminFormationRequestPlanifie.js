import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Components/Nav/Nav";
import Login from "./Login";
import { Link } from "react-router-dom";
import { getRequestFormation } from "../actions/requestFormation.actions";
import RequestFormationStatus from '../Components/Formation/RequestFormationStatus';
import { DateParser } from "../Components/utils/Utils";
import DeleteRequest from '../Components/Formation/DeleteRequest';
import AsignFormRequest from '../Components/Formation/AsignFormRequest';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminFormationRequestPlanifie = () => {

    const userData = useSelector((state) => state.userReducer);
    const requestData = useSelector((state) => state.requestFormationReducer);
    const [activeCurrentIndex, setActiveCurrentIndex] = useState();
    const dispatch = useDispatch();

    const requestFormations = Object.values(requestData).filter((formation) => {
        return formation.formationStatus === "1";
    });

    const request = Object.values(requestData).filter((formation) => {
        return formation.formationStatus === "0";
    });

    const rows = request.length

    const toggleShowAccordion = (id) => {
        if (activeCurrentIndex === id) {
            setActiveCurrentIndex(id);
        } else {
            setActiveCurrentIndex(id);
        }
    }

    useEffect(() => {
        dispatch(getRequestFormation());
    }, []);


    return (
        <>
            <ToastContainer />
            {userData.isAdmin ? (
                <>
                    <Nav />
                    <div className="mainContainer">
                        <div className="leftBlock">
                            <div className="left_menu">
                                <ul className="li">
                                    <i className="fa-regular fa-address-card"></i>
                                    <Link to={"/adminUsers"}>Gerer les utilisateurs</Link>
                                </ul>
                                <ul className="li">
                                    <i className="far fa-plus-square"></i>
                                    <Link to={"/formation"}>Gerer les formations</Link>
                                </ul>
                                <ul className="li">
                                    <i className="fa-brands fa-stack-overflow"></i>
                                    <Link to={"/requestFormation"}>Demandes de formations <span className='numberRow'>{rows}</span></Link>
                                </ul>
                            </div>
                        </div>
                        <div className="centerBlock_admin">
                            <div className="useronline-container-admin">

                                <div className="requestformation">
                                    <>
                                        <div className='sous_menu'>
                                            <Link to={"/requestFormation"}><p>A traiter </p></Link>
                                            <Link to={"/planifie"}><p>Planifiée </p></Link>
                                            <Link to={"/termine"}><p>Terminée </p></Link>
                                            <Link to={"/annule"}><p>Annulée </p></Link>
                                        </div>
                                        {requestFormations.map((request, id) => {
                                            return (
                                                <div className="accordion-item" key={id} onClick={() => toggleShowAccordion(id)}>
                                                    <div
                                                        className="requestformation_container"
                                                        key={request.id}
                                                    >
                                                        <div className="resquestformation_body">
                                                            <p>Formation : <span className='formaName'>{request.Formation.formationName} - {request.Formation.formationLvl}</span> </p>
                                                        </div>
                                                        <div className="resquestformation_body">
                                                            <p>Pour : <span className='formaName'>{request.user.firstname} {" "} {request.user.name}</span></p>
                                                        </div>
                                                        <div className='resquestformation_body'>
                                                            <RequestFormationStatus formation={request} formationId={request.id} />
                                                        </div>
                                                        <div className="requestformation_date">
                                                            <p>Date souhaitée :</p>
                                                            <p><span className='formaName'>  {DateParser(request.formationDate)}</span></p>
                                                        </div>
                                                        <div className="progress_formation">
                                                            <DeleteRequest formations={request} />
                                                        </div>

                                                    </div>
                                                    {activeCurrentIndex === id &&
                                                        <AsignFormRequest request={request} />
                                                    }
                                                </div>
                                            );
                                        })}

                                    </>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default AdminFormationRequestPlanifie;