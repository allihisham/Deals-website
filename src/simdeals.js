import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './SimDeals.css';

function SimDeals() {
    const [deals, setDeals] = useState([]);
    const [filteredDeals, setFilteredDeals] = useState([]);
    const [displayedDeals, setDisplayedDeals] = useState([]);
    const [filters, setFilters] = useState({
        provider: 'Any',
        monthlyCost: 'Any',
        data: 'Any',
        minutes: 'Any',
        texts: 'Any',
        contract: 'Any',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const dealsPerPage = 8;

    useEffect(() => {
        // Load CSV data
        Papa.parse('/data/sim_deals.csv', {
            download: true,
            header: true,
            complete: (results) => {
                console.log('Loaded Deals:', results.data); // Log the loaded data
                setDeals(results.data);
                setFilteredDeals(results.data);
                setDisplayedDeals(results.data.slice(0, dealsPerPage));
            },
        });
    }, []);

    useEffect(() => {
        // Apply filters
        let filtered = deals.filter(deal => {
            return (
                (filters.provider === 'Any' || (deal['Title'] && deal['Title'].includes(filters.provider))) &&
                (filters.monthlyCost === 'Any' || (deal.Price && parseFloat(deal.Price.replace('£', '')) <= parseFloat(filters.monthlyCost))) &&
                (filters.data === 'Any' || (deal.Data && deal.Data.includes(filters.data))) &&
                (filters.minutes === 'Any' || (deal.Minutes && deal.Minutes.includes(filters.minutes))) &&
                (filters.texts === 'Any' || (deal.Texts && deal.Texts.includes(filters.texts))) &&
                (filters.contract === 'Any' || (deal['Contract Length'] && deal['Contract Length'].includes(filters.contract)))
            );
        });
        console.log('Filtered Deals:', filtered); // Log the filtered deals
        setFilteredDeals(filtered);
        setDisplayedDeals(filtered.slice(0, dealsPerPage));
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, deals]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleShowMore = () => {
        const newPage = currentPage + 1;
        const newDeals = filteredDeals.slice(0, newPage * dealsPerPage);
        setDisplayedDeals(newDeals);
        setCurrentPage(newPage);
    };

    return (
        <div className="sim-deals-container">
            <div className="filter-panel">
                <h2>Filter Deals</h2>
                <div className="filter-group">
                    <label>Provider:</label>
                    <select name="provider" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="Spusu Mobile SIM Deal">Spusu</option>
                        <option value="Lebara Mobile SIM Deal">Lebara</option>
                        <option value="Smarty SIM Deal">Smarty</option>
                        <option value="Three SIM Deal">Three</option>
                        <option value="iD Mobile SIM Deal">iD Mobile</option>
                        <option value="Vodafone SIM Deal">Vodafone</option>
                        <option value="Tesco Mobile SIM Deal">Tesco Mobile</option>
                        <option value="EE SIM Deal">EE</option>
                        <option value="ASDA Mobile SIM Deal">ASDA Mobile</option>
                        <option value="Talkmobile SIM Deal">Talkmobile</option>
                        <option value="Sky Mobile SIM Deal">Sky Mobile</option>
                        <option value="GiffGaff SIM Deal">GiffGaff</option>
                        <option value="1pMobile SIM Deal">1pMobile</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Monthly Cost:</label>
                    <select name="monthlyCost" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="5">Up to £5</option>
                        <option value="10">Up to £10</option>
                        <option value="20">Up to £20</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Data:</label>
                    <select name="data" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="5GB">Up to 5GB</option>
                        <option value="10GB">Up to 10GB</option>
                        <option value="20GB">Up to 20GB</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Minutes:</label>
                    <select name="minutes" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="1000">1000 minutes</option>
                        <option value="unlimited">Unlimited</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Texts:</label>
                    <select name="texts" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="1000">1000 texts</option>
                        <option value="unlimited">Unlimited</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Contract Length:</label>
                    <select name="contract" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="1 month">1 month</option>
                        <option value="12 month">12 months</option>
                        <option value="24 month">24 months</option>
                    </select>
                </div>
            </div>
            <div className="deals-list">
                {displayedDeals.map((deal, index) => (
                    <div key={index} className="deal-card">
                        <h3>{deal['Title']}</h3>
                        <p>{deal['Network']}</p>
                        <p>Data: {deal['Data']}</p>
                        <p>Price: {deal['Price']}</p>
                        <p>Contract Length: {deal['Contract Length']}</p>
                        <p>Minutes: {deal['Minutes']}</p>
                        <p>Texts: {deal['Texts']}</p>
                    </div>
                ))}
                {filteredDeals.length > displayedDeals.length && (
                    <button onClick={handleShowMore} className="show-more-button">Show More</button>
                )}
            </div>
        </div>
    );
}

export default SimDeals;