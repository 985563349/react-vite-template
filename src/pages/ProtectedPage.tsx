import { request } from '@/utils/request';

function ProtectedPage() {
  return (
    <div>
      <h1>Protected</h1>

      <button
        onClick={() => {
          request('/unauthorized-error');
        }}
      >
        Unauthorized Test
      </button>
    </div>
  );
}

export default ProtectedPage;
