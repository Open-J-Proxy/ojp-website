// OJP Fit Assessment - Interactive Questionnaire

const questions = [
    {
        id: 1,
        text: 'How many independent services connect to your database?',
        options: [
            { text: 'One monolithic application', score: 0 },
            { text: 'A few services', score: 1 },
            { text: 'Many microservices', score: 4 },
            { text: 'Serverless or highly elastic consumers', score: 9 }
        ]
    },
    {
        id: 2,
        text: 'Do you experience database instability during traffic spikes?',
        options: [
            { text: 'Never', score: 0 },
            { text: 'Occasionally', score: 1 },
            { text: 'Frequently', score: 4 },
            { text: 'Severe during bursts', score: 9 }
        ]
    },
    {
        id: 3,
        text: 'Do slow queries affect fast transactional queries?',
        options: [
            { text: 'Never', score: 0 },
            { text: 'Rarely', score: 1 },
            { text: 'Sometimes', score: 4 },
            { text: 'Frequently', score: 9 }
        ]
    },
    {
        id: 4,
        text: 'Are database connection counts difficult to control?',
        options: [
            { text: 'Not a concern', score: 0 },
            { text: 'Slightly', score: 1 },
            { text: 'Yes, they grow quickly', score: 4 },
            { text: 'Connection storms occur', score: 9 }
        ]
    },
    {
        id: 5,
        text: 'Do you operate across multiple database engines or plan to change databases?',
        options: [
            { text: 'No', score: 0 },
            { text: 'Possibly in future', score: 1 },
            { text: 'Multiple databases today', score: 4 },
            { text: 'Portability is important', score: 9 }
        ]
    },
    {
        id: 6,
        text: 'Do you need distributed transactions across systems or databases?',
        options: [
            { text: 'No', score: 0 },
            { text: 'Rarely', score: 1 },
            { text: 'Occasionally', score: 4 },
            { text: 'Frequently', score: 9 }
        ]
    },
    {
        id: 7,
        text: 'Do you lack visibility into query latency or connection pressure?',
        options: [
            { text: 'Monitoring is sufficient', score: 0 },
            { text: 'Some gaps', score: 1 },
            { text: 'Hard to diagnose issues', score: 4 },
            { text: 'Very limited insight', score: 9 }
        ]
    },
    {
        id: 8,
        text: 'Is your database infrastructure overprovisioned to handle spikes?',
        options: [
            { text: 'No', score: 0 },
            { text: 'Possibly', score: 1 },
            { text: 'Yes somewhat', score: 4 },
            { text: 'Significantly overprovisioned', score: 9 }
        ]
    },
    {
        id: 9,
        text: 'Do your workloads scale rapidly (queues, microservices, serverless)?',
        options: [
            { text: 'No', score: 0 },
            { text: 'Limited scaling', score: 1 },
            { text: 'Moderate scaling', score: 4 },
            { text: 'Highly elastic workloads', score: 9 }
        ]
    }
];

const resultCategories = [
    {
        min: 0,
        max: 24,
        label: 'OJP likely unnecessary for this system',
        emoji: '🔴',
        explanation: 'Your database architecture appears straightforward and well-controlled. OJP may not add significant value at this stage, but it is worth revisiting as your system grows.',
        capabilities: []
    },
    {
        min: 25,
        max: 48,
        label: 'OJP may provide benefits',
        emoji: '🟠',
        explanation: 'Your system shows some signs that a database proxy could help. OJP could provide value in areas such as:',
        capabilities: [
            'Centralized connection pooling to reduce connection overhead',
            'Demand smoothing and connection management during moderate traffic spikes',
            'SQL observability and metrics for better visibility'
        ]
    },
    {
        min: 49,
        max: 72,
        label: 'OJP is likely beneficial',
        emoji: '🟡',
        explanation: 'Your database architecture shows clear signs that a proxy layer would help. OJP can address your challenges with:',
        capabilities: [
            'Centralized connection pooling across all services',
            'Slow query segregation to protect transactional workloads',
            'Backpressure and circuit breakers to absorb traffic spikes',
            'SQL observability and metrics for detailed diagnostics',
            'Database-agnostic architecture for flexibility'
        ]
    },
    {
        min: 73,
        max: Infinity,
        label: 'OJP strongly recommended',
        emoji: '🟢',
        explanation: 'Your system is a strong candidate for OJP. The identified challenges are exactly what OJP is designed to solve:',
        capabilities: [
            'Centralized connection pooling to eliminate connection storms',
            'Slow query segregation to protect fast transactional queries',
            'Backpressure and circuit breakers for resilience under heavy load',
            'Database-agnostic architecture to support multiple or changing engines',
            'Distributed transaction support for cross-system workloads',
            'SQL observability and metrics for full visibility',
            'Demand smoothing and connection management for highly elastic workloads'
        ]
    }
];

let answers = {};

const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);

function getResultCategory(score) {
    return resultCategories.find(cat => score >= cat.min && score <= cat.max);
}

function calculateScore() {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
}

function renderQuestion(index) {
    const question = questions[index];
    const progress = index + 1;
    const progressPercent = Math.round(((index + 1) / questions.length) * 100);

    const container = document.getElementById('assessment-container');
    container.innerHTML = `
        <div class="assessment-progress">
            <div class="assessment-progress-label">Question ${progress} of ${questions.length}</div>
            <div class="assessment-progress-bar">
                <div class="assessment-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
        </div>
        <div class="assessment-question">
            <h3 class="assessment-question-text">${progress}. ${question.text}</h3>
            <div class="assessment-options">
                ${question.options.map((option, i) => `
                    <label class="assessment-option${answers[question.id] === option.score && answers[question.id] !== undefined ? ' selected' : ''}">
                        <input type="radio" name="q${question.id}" value="${option.score}" ${answers[question.id] === option.score && answers[question.id] !== undefined ? 'checked' : ''}>
                        <span class="assessment-option-text">${option.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        <div class="assessment-navigation">
            ${index > 0 ? `<button class="btn btn-blue assessment-btn" id="prev-btn">← Previous</button>` : '<span></span>'}
            <button class="btn btn-blue assessment-btn" id="next-btn" ${answers[question.id] === undefined ? 'disabled' : ''}>
                ${index < questions.length - 1 ? 'Next →' : 'See Results'}
            </button>
        </div>
    `;

    // Attach option selection listeners
    container.querySelectorAll('.assessment-option').forEach(label => {
        label.addEventListener('click', () => {
            const input = label.querySelector('input[type="radio"]');
            const selectedScore = parseInt(input.value, 10);
            answers[question.id] = selectedScore;
            container.querySelectorAll('.assessment-option').forEach(l => l.classList.remove('selected'));
            label.classList.add('selected');
            document.getElementById('next-btn').disabled = false;
        });
    });

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => renderQuestion(index - 1));
    }

    // Next / Submit button
    document.getElementById('next-btn').addEventListener('click', () => {
        if (answers[question.id] === undefined) return;
        if (index < questions.length - 1) {
            renderQuestion(index + 1);
        } else {
            renderResult();
        }
    });
}

function renderResult() {
    const score = calculateScore();
    const category = getResultCategory(score);
    const container = document.getElementById('assessment-container');

    const capabilitiesHtml = category.capabilities.length > 0
        ? `<ul class="assessment-result-capabilities">
            ${category.capabilities.map(c => `<li>${c}</li>`).join('')}
           </ul>`
        : '';

    const rangesHtml = resultCategories.map(cat => {
        const rangeLabel = cat.max === Infinity ? `${cat.min}–${maxScore}` : `${cat.min}–${cat.max}`;
        const isCurrent = cat === category;
        return `<li class="assessment-score-range${isCurrent ? ' assessment-score-range--current' : ''}">
            <span class="assessment-score-range-emoji">${cat.emoji}</span>
            <span class="assessment-score-range-label">${rangeLabel} — ${cat.label}</span>
        </li>`;
    }).join('');

    container.innerHTML = `
        <div class="assessment-result">
            <div class="assessment-result-score">
                <span class="assessment-result-emoji">${category.emoji}</span>
            </div>
            <h3 class="assessment-result-label">${category.label}</h3>
            <p class="assessment-result-score-value">Your score: <strong>${score} / ${maxScore}</strong></p>
            <p class="assessment-result-explanation">${category.explanation}</p>
            ${capabilitiesHtml}
            <div class="assessment-score-ranges">
                <h4 class="assessment-score-ranges-title">Score ranges</h4>
                <ul class="assessment-score-ranges-list">
                    ${rangesHtml}
                </ul>
            </div>
            <div class="assessment-result-actions">
                <button class="btn btn-blue assessment-btn" id="restart-btn">Retake Assessment</button>
                <a href="documentation.html" class="btn btn-blue assessment-btn">Get Started with OJP</a>
            </div>
        </div>
    `;

    document.getElementById('restart-btn').addEventListener('click', () => {
        answers = {};
        renderQuestion(0);
    });
}

function initAssessment() {
    const container = document.getElementById('assessment-container');
    if (!container) return;
    answers = {};
    renderQuestion(0);
}

document.addEventListener('DOMContentLoaded', initAssessment);
