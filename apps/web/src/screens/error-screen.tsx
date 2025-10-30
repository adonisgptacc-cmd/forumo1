import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorScreen() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 px-12 py-10 shadow-2xl shadow-black/40">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-4 max-w-md text-center text-slate-300">{message}</p>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Back to safety
        </button>
      </div>
    </div>
  );
}
