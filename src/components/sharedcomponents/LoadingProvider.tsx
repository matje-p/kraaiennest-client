// components/LoadingProvider.tsx
import { ReactNode } from "react";
import { useUIState } from "../../hooks/useUiState";

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { uiState } = useUIState();

  return (
    <>
      {children}
      {uiState.isLoading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50"
          style={{ zIndex: 1050 }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
