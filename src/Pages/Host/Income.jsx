import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import incomeImg from './images/income.png'
function Income() {
  const linkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: '#161616'
  }

    const transactionsData = [
        { amount: 720, date: "Jan 3, '25", id: "1" },
        { amount: 560, date: "Dec 12, '24", id: "2" },
        { amount: 980, date: "Dec 3, '23", id: "3" },
    ]

  return (
    <> 
    {/* {link back to the host page} */}
     <Link to='/host' style={linkStyles}>
       <IoMdArrowBack />
       <p>go back to host</p>
     </Link>
      <section className="host-income">
            <h1>Income</h1>
            <p>
                Last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
            <img
                className="graph"
                src={incomeImg}
                alt="Income graph"
            />
            <div className="info-header">
                <h3>Your transactions (3)</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="transactions">
                {transactionsData.map((item) => (
                    <div key={item.id} className="transaction">
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Income