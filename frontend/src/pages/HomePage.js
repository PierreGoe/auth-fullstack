export function HomePage() {
  return (
    <>
      <h2>Features:</h2>
      <ul>
        <li>Functional backend auth (signup + login)</li>
        <li>Functional frontend form to call backend auth</li>
        <li>
          "Protected" admin route (no link and redirection to Home for anonymous
          users )
        </li>
        <li>404 Error page for all undefined routes</li>
      </ul>
    </>
  );
}
