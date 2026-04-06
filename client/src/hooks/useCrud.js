import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'http://localhost:5000/api';

export default function useCrud(entity) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!entity) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${entity}`);
      if (!response.ok) throw new Error(`Failed to fetch ${entity}: ${response.statusText}`);
      const json = await response.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [entity]);

  const createRecord = async (record) => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${entity}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Create operation failed');
      }
      const newRecord = await response.json();
      setData(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRecord = async (id, record) => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${entity}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Update operation failed');
      }
      const updatedRecord = await response.json();
      setData(prev => prev.map(r => r.id === id || r.id?.toString() === id?.toString() ? updatedRecord : r));
      return updatedRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRecord = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${entity}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Delete operation failed');
      }
      setData(prev => prev.filter(r => r.id !== id && r.id?.toString() !== id?.toString()));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAll();
  }, [entity, fetchAll]);

  return { data, loading, error, fetchAll, createRecord, updateRecord, deleteRecord };
}
