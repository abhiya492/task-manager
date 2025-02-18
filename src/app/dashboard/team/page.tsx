// src/app/dashboard/team/page.tsx
'use client';

export default function TeamPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Management</h1>
      <div className="bg-white rounded-lg border p-6">
        <p className="text-gray-600">
          The team management feature is coming soon. Here you will be able to:
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-600">
          <li>Invite team members</li>
          <li>Manage permissions</li>
          <li>Assign tasks to team members</li>
          <li>Track team progress</li>
        </ul>
      </div>
    </div>
  );
}