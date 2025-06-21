export const Footer = () => {
  return (
    <footer className="flex border-t justify-center font-medium p-4">
      {" "}
      <div>
        <p>Swapi &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
