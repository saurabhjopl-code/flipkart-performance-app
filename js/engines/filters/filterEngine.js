import { getState, setFilters, setFilteredData } from "../../core/stateManager.js";
import { filterByDateRange, parseDate } from "../../core/dateUtils.js";

function populateMonthDropdown() {

    const state = getState();
    const data = state.rawData.GMV_DATE || [];

    const monthSet = new Set();

    data.forEach(row => {
        if (row["Order Date"]) {
            const d = parseDate(row["Order Date"]);
            const key = `${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
            monthSet.add(key);
        }
    });

    const months = Array.from(monthSet).sort((a,b)=>{
        const [m1,y1]=a.split("/");
        const [m2,y2]=b.split("/");
        return new Date(y1,m1-1)-new Date(y2,m2-1);
    });

    const select = document.getElementById("monthFilter");
    select.innerHTML = `<option value="">All</option>`;

    months.forEach(m=>{
        select.innerHTML+=`<option value="${m}">${m}</option>`;
    });

    if(months.length){
        select.value = months[months.length-1];
        setFilters({month:months[months.length-1]});
    }
}

export function applyFilters(){

    const state=getState();
    const {startDate,endDate,month}=state.filters;
    const filtered={};

    Object.keys(state.rawData).forEach(key=>{

        const dataset=state.rawData[key];
        if(!dataset?.length){
            filtered[key]=[];
            return;
        }

        const dateField=Object.keys(dataset[0]).find(col=>
            col.toLowerCase().includes("date")
        );

        let temp=dataset;

        if(month && dateField){
            temp=temp.filter(row=>{
                const d=parseDate(row[dateField]);
                const key=`${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
                return key===month;
            });
        }
        else if(dateField){
            temp=filterByDateRange(dataset,startDate,endDate,dateField);
        }

        filtered[key]=temp;
    });

    setFilteredData(filtered);
}

export function initFilters(onFilterChange){

    const startInput=document.getElementById("startDate");
    const endInput=document.getElementById("endDate");
    const monthSelect=document.getElementById("monthFilter");

    startInput.addEventListener("change",()=>{
        setFilters({startDate:new Date(startInput.value),month:null});
        monthSelect.value="";
        applyFilters();
        onFilterChange();
    });

    endInput.addEventListener("change",()=>{
        setFilters({endDate:new Date(endInput.value),month:null});
        monthSelect.value="";
        applyFilters();
        onFilterChange();
    });

    monthSelect.addEventListener("change",()=>{
        setFilters({month:monthSelect.value,startDate:null,endDate:null});
        startInput.value="";
        endInput.value="";
        applyFilters();
        onFilterChange();
    });

    document.addEventListener("dataReady",()=>{
        populateMonthDropdown();
        applyFilters();
        onFilterChange();
    });
}
