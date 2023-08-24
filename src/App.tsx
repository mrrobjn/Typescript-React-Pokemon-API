import "./App.css";

function App() {
  interface Students {
    name: string;
    age: number;
  }
  let students: Students = {
    name: "",
    age: 12,
  };
  students.name = "john";

  const logst: (text: string) => string = (text: string) => {
    return text;
  };
  return (
    <>
      <h1>{logst(students.name)}</h1>
    </>
  );
}

export default App;
