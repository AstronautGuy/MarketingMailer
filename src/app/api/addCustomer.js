// pages/api/addCustomer.js
import { supabase } from '/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone_number, company_name, additional_email_ids, additional_phone_numbers } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }

        const { data, error } = await supabase
            .from('customers')
            .insert([{
                name,
                email,
                phone_number,
                company_name,
                additional_email_ids,
                additional_phone_numbers
            }]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ data });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
