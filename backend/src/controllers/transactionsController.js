import {sql} from '../config/db.js'; 

export async function  getTransactionsByUserId(req,res) {
  try {
    const {userid} = req.params; 

    const transaction = await sql`
      SELECT * FROM transactions WHERE user_id = ${userid} ORDER by created_at DESC;
      `;
    res.status(200).json(transaction); // Return the transactions for the user

  } catch (error) {
    console.error("Error getting the transactions", error);
    res.status(500).json({ message: 'Internal server error' });
  }   
}

export async function createTransaction(req, res) {

      // Title, amout, category, user_id
      try {
        const {title, amount, category, user_id} = req.body 
    
        if (!title || amount == undefined || !category || !user_id) { 
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        const transaction = await sql`  
          INSERT INTO transactions (user_id, title, amount, category, created_at)
          VALUES (${user_id}, ${title}, ${amount}, ${category}, CURRENT_DATE)
          RETURNING *;
        `
        console.log("Transaction created:", transaction);
        res.status(201).json(transaction[0]); // Return the created transaction
      } catch (error) {
        console.error("Error creating the transaction:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
}

export async function deleteTransaction(req, res) { 

  try {
    const {id} = req.params;
    
    if(isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Invalid transaction ID' });
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully', transaction: result[0] });
  } catch (error) {
    console.log("Error deleting the transaction:", error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export async function getSummaryByUserId(req,res){
  try {
    const {userid} = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount),0) AS balance FROM transactions
      WHERE user_id = ${userid};
    `; 

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount),0) AS income FROM transactions 
      WHERE user_id = ${userid} AND amount > 0;
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount),0) AS expenses FROM transactions 
      WHERE user_id = ${userid} AND amount < 0;
    `;


    res.status(200).json({
      balance: balanceResult[0]?.balance || 0,
      income: incomeResult[0]?.income || 0,
      expenses: expensesResult[0]?.expenses || 0
    });
  } catch (error) {
    console.error("Error getting the summary:", error);
    res.status(500).json({ message: 'Internal server error' });
  }

}