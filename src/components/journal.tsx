import React from 'react';
import { useQuery } from 'react-query';
import Journal from '../assets/interfaces/Journal';
import Button from 'react-bootstrap/Button';

const fetchJournals = async () => {
    const response = await fetch('https://localhost:7147/Journals');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const JournalComponent: React.FC = () => {
    const { data: journals, error, isLoading } = useQuery<Journal[], Error>('journals', fetchJournals);
    const role = localStorage.getItem('role');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }
    
    return (
        <div>
            <h1>Journals</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Author</th>
                <th>FilePath</th>
                <th>Publication Date</th>
                {role === 'admin' && <th>Add New</th>}
                </tr>
            </thead>
            <tbody>
                {journals && journals.map((journal) => (
                <tr key={journal.id}>
                    <td>{journal.id}</td>
                    <td>{journal.author}</td>
                    <td>{journal.filePath}</td>
                    <td>{new Date(journal.publicationDate).toLocaleDateString()}</td>
                    <td>
                        {role === 'admin' && <Button variant="primary">Add New</Button>}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default JournalComponent;