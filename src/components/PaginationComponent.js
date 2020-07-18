import React from 'react';

const PaginationComponent = ({ usersPerPage, totalUsers, goToPaginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers/usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <div className= "row">
        <nav className= "mx-auto">
          <ul className= "pagination">
            {pageNumbers.map((eachNumber) => (
                <li key= {eachNumber} className= "border-dark" style= {{border: "1px"}}>
                  <button onClick= {() => {goToPaginate(eachNumber)}} className= "page-link">
                    { eachNumber }
                  </button>
                </li>
            ))}
          </ul>
        </nav>
      </div>
  );
};

export default PaginationComponent;
