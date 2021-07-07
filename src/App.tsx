import './App.css';
import { Grid, GridColumn as Column, GridPageChangeEvent, GridSelectionChangeEvent } from '@progress/kendo-react-grid';
import { useState } from 'react';

const createRandomData = (count: number) => {
  const firstNames = [
      "Nancy",
      "Andrew",
      "Janet",
      "Margaret",
      "Steven",
      "Michael",
      "Robert",
      "Laura",
      "Anne",
      "Nige",
    ],
    lastNames = [
      "Davolio",
      "Fuller",
      "Leverling",
      "Peacock",
      "Buchanan",
      "Suyama",
      "King",
      "Callahan",
      "Dodsworth",
      "White",
    ],
    cities = [
      "Seattle",
      "Tacoma",
      "Kirkland",
      "Redmond",
      "London",
      "Philadelphia",
      "New York",
      "Seattle",
      "London",
      "Boston",
    ],
    titles = [
      "Accountant",
      "Vice President, Sales",
      "Sales Representative",
      "Technical Support",
      "Sales Manager",
      "Web Designer",
      "Software Developer",
    ];
  return Array(count)
    .fill({})
    .map((_, idx) => ({
      id: idx + 1,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
    }));
};

const SELECTED_FIELD = "selected";

function App() {
  const [data, setData] = useState(createRandomData(50000));
  const [skip, setSkip] = useState(0);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  console.log(selectedId);

  const pageChange = (event: GridPageChangeEvent) => {
    setSkip(event.page.skip);
  };

  const onSelectionChange = (event: GridSelectionChangeEvent) => {
    const item = event.dataItems[event.startRowIndex];
    setSelectedId(item['id']);
  };

  return (
    <div>
      <button onClick={() => setData(data.slice(0, data.length / 2))}>Reduce data</button>
      <Grid
        style={{
          height: "440px",
        }}
        rowHeight={40}
        data={data.slice(skip, skip + 20).map(it => ({
          ...it,
          [SELECTED_FIELD]: selectedId === it.id
        }))}
        pageSize={20}
        dataItemKey="id"
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          mode: 'single',
        }}
        onSelectionChange={onSelectionChange}
        total={data.length}
        skip={skip}
        scrollable={"virtual"}
        onPageChange={pageChange}
      >
        <Column field="id" title="ID" width="150px" />
        <Column field="firstName" title="First Name" />
        <Column field="lastName" title="Last Name" />
        <Column field="city" title="City" width="120px" />
        <Column field="title" title="Title" width="200px" />
      </Grid>
    </div>
  );
}

export default App;
