import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './AppleDeals.css'; // Assuming you will have styles for this component

function AppleDeals() {
    const [deals, setDeals] = useState([]);
    const [filteredDeals, setFilteredDeals] = useState([]);
    const [displayedDeals, setDisplayedDeals] = useState([]);
    const [filters, setFilters] = useState({
        version: 'Any',
        monthlyCost: 'Any',
        upfrontCost: 'Any',
        data: 'Any',
        minutes: 'Any',
        texts: 'Any',
        contract: 'Any',
        provider: 'Any',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const dealsPerPage = 8;

    useEffect(() => {
        // Load CSV data
        const loadData = async () => {
            const files = [
                { name: 'iPhone 14 Plus', path: '/data/Copy of samsu - iphone 14 plus.csv' },
                { name: 'iPhone 14 Pro', path: '/data/Copy of samsu - Apple iphone 14 pro.csv' },
            ];
            let allDeals = [];
            for (const file of files) {
                const response = await fetch(file.path);
                const text = await response.text();
                const results = Papa.parse(text, { header: true }).data;
                results.forEach(deal => deal.version = file.name); // Add version information to each deal
                allDeals = allDeals.concat(results);
            }
            setDeals(shuffleArray(allDeals)); // Shuffle the deals before setting them
            setFilteredDeals(shuffleArray(allDeals)); // Shuffle the deals before setting them
            setDisplayedDeals(shuffleArray(allDeals).slice(0, dealsPerPage)); // Shuffle the deals before displaying them
        };
        loadData();
    }, []);

    useEffect(() => {
        // Apply filters
        let filtered = deals.filter(deal => {
            return (
                (filters.version === 'Any' || deal.version === filters.version) &&
                (filters.monthlyCost === 'Any' || (deal['meta:monthly_cost'] && parseFloat(deal['meta:monthly_cost'].replace('£', '')) <= parseFloat(filters.monthlyCost.replace('£', '')))) &&
                (filters.upfrontCost === 'Any' || (deal['meta:upfront_cost'] && parseFloat(deal['meta:upfront_cost'].replace('£', '')) <= parseFloat(filters.upfrontCost.replace('£', '')))) &&
                (filters.data === 'Any' || (deal['meta:data'] && compareData(deal['meta:data'], filters.data))) &&
                (filters.minutes === 'Any' || (deal['meta:minutes'] && compareMinutes(deal['meta:minutes'], filters.minutes))) &&
                (filters.texts === 'Any' || (deal['meta:texts'] && compareTexts(deal['meta:texts'], filters.texts))) &&
                (filters.contract === 'Any' || (deal['meta:contract_period'] && deal['meta:contract_period'].includes(filters.contract))) &&
                (filters.provider === 'Any' || (deal['meta:provider_name'] && deal['meta:provider_name'].includes(filters.provider)))
            );
        });
        setFilteredDeals(shuffleArray(filtered)); // Shuffle the filtered deals
        setDisplayedDeals(shuffleArray(filtered).slice(0, dealsPerPage)); // Shuffle the filtered deals before displaying them
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

    // Function to shuffle an array
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Helper functions to compare data, minutes, and texts
    const compareData = (dealData, filterData) => {
        if (filterData === 'Any') return true;
        if (filterData === 'Unlimited data') return dealData === 'Unlimited';
        const dealValue = parseInt(dealData.split('GB')[0]);
        const filterValue = parseInt(filterData.split('GB')[0]);
        return dealValue >= filterValue;
    };

    const compareMinutes = (dealMinutes, filterMinutes) => {
        if (filterMinutes === 'Any') return true;
        if (filterMinutes === 'Unlimited minutes') return dealMinutes === 'Unlimited';
        const dealValue = parseInt(dealMinutes);
        const filterValue = parseInt(filterMinutes.split('+')[0]);
        return dealValue >= filterValue;
    };

    const compareTexts = (dealTexts, filterTexts) => {
        if (filterTexts === 'Any') return true;
        if (filterTexts === 'Unlimited texts') return dealTexts === 'Unlimited';
        const dealValue = parseInt(dealTexts);
        const filterValue = parseInt(filterTexts.split('+')[0]);
        return dealValue >= filterValue;
    };

    return (
        <div className="apple-deals-container">
            <div className="filter-panel">
                <h2>Filter Deals</h2>
                <div className="filter-group">
                    <label>Version:</label>
                    <select name="version" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="iPhone 14 Plus">iPhone 14 Plus</option>
                        <option value="iPhone 14 Pro">iPhone 14 Pro</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Monthly Cost:</label>
                    <select name="monthlyCost" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="10">Up to £10</option>
                        <option value="20">Up to £20</option>
                        <option value="30">Up to £30</option>
                        <option value="40">Up to £40</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Upfront Cost:</label>
                    <select name="upfrontCost" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="0">£0 Upfront</option>
                        <option value="50">Up to £50</option>
                        <option value="100">Up to £100</option>
                        <option value="150">Up to £150</option>
                        <option value="200">Up to £200</option>
                        <option value="350">Up to £350</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Data:</label>
                    <select name="data" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="500MB+ data">500MB+ data</option>
                        <option value="1GB+ data">1GB+ data</option>
                        <option value="4GB+ data">4GB+ data</option>
                        <option value="8GB+ data">8GB+ data</option>
                        <option value="20GB+ data">20GB+ data</option>
                        <option value="50GB+ data">50GB+ data</option>
                        <option value="Unlimited data">Unlimited data</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Minutes:</label>
                    <select name="minutes" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="100+ minutes">100+ minutes</option>
                        <option value="300+ minutes">300+ minutes</option>
                        <option value="600+ minutes">600+ minutes</option>
                        <option value="2000+ minutes">2000+ minutes</option>
                        <option value="Unlimited minutes">Unlimited minutes</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Texts:</label>
                    <select name="texts" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="200+ texts">200+ texts</option>
                        <option value="4000+ texts">4000+ texts</option>
                        <option value="Unlimited texts">Unlimited texts</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Contract:</label>
                    <select name="contract" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="1 Months">1 Months</option>
                        <option value="12 Months">12 Months</option>
                        <option value="24 Months">24 Months</option>
                        <option value="30 Months">30 Months</option>
                        <option value="36 Months">36 Months</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Provider:</label>
                    <select name="provider" onChange={handleFilterChange}>
                        <option value="Any">Any</option>
                        <option value="ID_Mobile">ID Mobile</option>
                        <option value="Virgin">Virgin</option>
                        <option value="O2">O2</option>
                        <option value="Three">Three</option>
                    </select>
                </div>
            </div>
            <div className="deals-list">
                {displayedDeals.map((deal, index) => (
                    <div key={index} className="deal-card">
                        <h3>{deal.Categories.split(' > ')[1]}</h3> {/* Extract the relevant part */}
                        <p>Monthly Cost: {deal['meta:monthly_cost']}</p>
                        <p>Upfront Cost: {deal['meta:upfront_cost']}</p>
                        <p>Data: {deal['meta:data']}</p>
                        <p>Minutes: {deal['meta:minutes']}</p>
                        <p>Texts: {deal['meta:texts']}</p>
                        <p>Contract: {deal['meta:contract_period']}</p>
                        <p>Provider: {deal['meta:provider_name']}</p>
                    </div>
                ))}
                {filteredDeals.length > displayedDeals.length && (
                    <button onClick={handleShowMore} className="show-more-button">Show More</button>
                )}
            </div>
        </div>
    );
}

export default AppleDeals;