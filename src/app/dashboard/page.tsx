import { signOut } from "./actions";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <form>
        <button formAction={signOut}>Logout</button>
      </form>
    </>
  );
};

export default Dashboard;
