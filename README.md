
<h1>CV Evaluator</h1>

<h2>Overview</h2>
<p>
  The <strong>CV Evaluator</strong> is a web application designed to analyze resumes based on user-provided criteria using OpenAI's API.
  It allows users to upload resumes, specify required skills, and evaluate the resumes against the criteria.
</p>


<h2>Prerequisites</h2>
<ul>
  <li>Docker and Docker Compose installed on your system.</li>
  <li>Environment variables set up for backend and frontend.</li>
</ul>

<h2>Project Structure</h2>
<pre>
.
├── backend
│   ├── src                 # Backend source code
│   ├── Dockerfile          # Docker configuration for backend
│   ├── package.json        # Backend dependencies
│   └── ...
├── frontend
│   ├── pages               # Frontend pages and components
│   ├── Dockerfile          # Docker configuration for frontend
│   ├── package.json        # Frontend dependencies
│   └── ...
├── docker-compose.yml       # Orchestrates backend and frontend containers
└── README.md                # Project documentation
</pre>

<h2>Installation and Setup</h2>

<h3>Step 1: Clone the Repository</h3>
<pre>
git clone &lt;repository_url&gt;
cd &lt;repository_folder&gt;
</pre>

<h3>Step 2: Configure Environment Variables</h3>

<h4>Backend</h4>
<p>Create a <code>.env</code> file in the <code>backend</code> directory with the following content:</p>
<pre>
NODE_ENV=production
OPENAI_API_KEY=sk-&lt;your_openai_api_key&gt;
</pre>

<h4>Frontend</h4>
<p>Create a <code>.env.local</code> file in the <code>frontend</code> directory with the following content:</p>
<pre>
NEXT_PUBLIC_API_URL=http://localhost:3001
</pre>

<h2>Running the Application</h2>

<h3>Using Docker</h3>
<ol>
  <li><strong>Build and Run Containers:</strong>
    <pre>docker-compose up --build</pre>
  </li>
  <li><strong>Access the Application:</strong>
    <ul>
      <li>Frontend: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></li>
      <li>Backend: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></li>
    </ul>
  </li>
  <li><strong>Stop the Containers:</strong>
    <pre>docker-compose down</pre>
  </li>
</ol>

<h2>File Structure and Technologies</h2>

<h3>Frontend</h3>
<ul>
  <li><strong>Framework:</strong> Next.js</li>
  <li><strong>Port:</strong> 3000</li>
  <li><strong>Description:</strong> Provides a single-page interface for uploading resumes and viewing results.</li>
</ul>

<h3>Backend</h3>
<ul>
  <li><strong>Framework:</strong> Nest.js</li>
  <li><strong>Port:</strong> 3001</li>
  <li><strong>Description:</strong> Handles resume processing, skill matching, and communication with OpenAI API.</li>
</ul>

<h2>Deliverables Checklist</h2>
<ul>
  <li>Source Code: Includes frontend and backend files with <code>docker-compose.yml</code> and Docker configurations.</li>
  <li>README File: Detailed instructions for setup and execution.</li>
  <li>Dockerization: Both frontend and backend services are containerized.</li>
</ul>

<h2>Author</h2>
<p>Aman Prateek</p>
<p>amanpra333@gmail.com</p>
