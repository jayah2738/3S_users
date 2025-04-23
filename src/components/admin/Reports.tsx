'use client';

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import {
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiPrinter,
} from 'react-icons/fi';

interface Report {
  _id: string;
  type: string;
  data: any;
  generatedAt: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [selectedType, dateRange]);

  const fetchReports = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedType !== 'all') params.append('type', selectedType);
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      const res = await fetch(`/api/admin/reports?${params}`);
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/admin/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          startDate: dateRange.start,
          endDate: dateRange.end,
        }),
      });
      const data = await res.json();
      setReports((prev) => [data, ...prev]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = async (report: Report) => {
    try {
      const blob = new Blob([JSON.stringify(report.data, null, 2)], {
        type: 'application/json',
      });
      saveAs(
        blob,
        `report-${report.type}-${new Date(report.generatedAt).toISOString()}.json`
      );
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const printReport = (report: Report) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Report - ${report.type}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; border: 1px solid #ddd; }
              th { background-color: #f5f5f5; }
            </style>
          </head>
          <body>
            <h1>Report: ${report.type}</h1>
            <p>Generated: ${new Date(report.generatedAt).toLocaleString()}</p>
            <pre>${JSON.stringify(report.data, null, 2)}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const reportTypes = [
    'all',
    'user_activity',
    'content_engagement',
    'quiz_results',
    'progress_tracking',
  ];

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type.split('_').map(capitalize).join(' ')}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <input
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
} 