export function HomePage() {
  return (
    <>
      <h2>Features:</h2>
      <ul>
        <li>Done: Functional backend auth (signup + login)</li>
        <li>Done: Functional frontend form to call backend auth</li>
        <li>Done: 404 Error page for all undefined routes</li>
        <li>
          Done: Centralized prepared API instance + auto-update credentials on
          login
        </li>
        <li>Done: User data storage in Redux</li>
        <li>
          Todo: "Protected" admin route (no link available and auto-redirection
          to Home for anonymous users)
        </li>
        <li>Done: Add links in the main menu</li>
        <li>Done: Logout</li>
        <li>Todo: Add styles</li>
      </ul>
    </>
  );
}
