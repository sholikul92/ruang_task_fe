import { Button } from "./components/ui/button";

export const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <Button onClick={() => alert("Hi")}>Click Me</Button>
    </>
  );
};
