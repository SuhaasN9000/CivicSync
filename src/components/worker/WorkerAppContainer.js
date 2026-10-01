import React, { useState } from 'react';
import WorkerHeader from './WorkerHeader';
import WorkerTaskList from './WorkerTaskList';
import WorkerHistory from './WorkerHistory';
import WorkerProfile from './WorkerProfile';
import TaskExecutionModal from './TaskExecutionModal';
import TrackComplaintModal from '../user/TrackComplaintModal';

const WorkerAppContainer = () => {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'history' | 'profile'
  const [executingTask, setExecutingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <WorkerHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1 }}>
        {activeTab === 'tasks' && (
          <WorkerTaskList
            onSelectTask={(task) => setSelectedTask(task)}
            onStartExecution={(task) => setExecutingTask(task)}
          />
        )}

        {activeTab === 'history' && (
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px' }}>
            <WorkerHistory
              onSelectTask={(task) => setSelectedTask(task)}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <WorkerProfile />
        )}
      </main>

      {/* Task Execution & Proof Upload Modal */}
      {executingTask && (
        <TaskExecutionModal
          task={executingTask}
          onClose={() => setExecutingTask(null)}
        />
      )}

      {/* Task Details Review Modal */}
      {selectedTask && (
        <TrackComplaintModal
          complaint={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default WorkerAppContainer;
