import React from "react";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What Do you need Help with</h1>
        <p>Please choose from option Below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        {" "}
        <FaQuestionCircle /> Create New Ticket{" "}
      </Link>
      <Link to="/tickets" className="btn  btn-block">
        {" "}
        <FaTicketAlt /> View My Ticket{" "}
      </Link>


    </>
  );
}

export default Home;
