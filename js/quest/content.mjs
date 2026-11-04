export const OBJECTIVES = [
    { id: 'shared-pooling', title: 'Coordinate shared capacity' },
    { id: 'just-in-time', title: 'Acquire resources when needed' },
    { id: 'isolation-ha', title: 'Isolate workloads and plan for failure' }
];

export const EBOOK_SIGNUP_URL = 'https://e3b21e9a.sibforms.com/serve/MUIFAJw5SKRLsQqBLrNFqgODA-b6m3GI2V07UYdEx9dKfRKoibEeUV5rC9p81LW8vgoatlqitkMEPO-bRLjn8XGklyNKeXIxV4VGl-jnL1SZcx1qpAXYLJUqDt2UV-MLN4-vjIFwxfjQvXWqPWQmdXUGX8p8RNIh8SPyppiwL9CeO_Bby266HAetM8-kfV1_wGzz_d48js-btk9LgQ==';

export const WORLDS = [
    {
        id: 'fantasy', name: 'The Kingdom of a Thousand Gates', genre: 'Epic fantasy',
        badge: 'Guardian of the Gates', palette: ['#244c3b', '#d2a84b'],
        description: 'A kingdom of village gatehouses must learn to share the road to its Great Archive.',
        voice: 'A tale told beside the council fire',
        acts: [
            {
                title: 'The gates fall silent',
                story: 'At dawn, courier Mira reached the Great Archive and found every road blocked. Each village had built its own gatehouse and reserved a line of guards for messengers who might never arrive. Meanwhile, real travelers queued outside. The kingdom had plenty of guards in total, yet too many stood idle behind separate doors. As more villages joined the realm, each protected its own supply more fiercely. The council saw the paradox: adding villages had made the shared journey slower.',
                challenge: {
                    prompt: 'The council can add more village gatehouses or coordinate the guards it already has. Which choice addresses the root of the growing queues?',
                    options: ['Give each village an even larger permanent guard reserve.', 'Coordinate a shared pool of guards across the villages.', 'Close the Archive whenever a queue appears.'],
                    answer: 1,
                    explanation: 'Separate pools can each reserve capacity that sits idle while another group waits. A coordinated pool can serve demand across participating applications, within a deliberately managed total capacity.',
                    hints: ['Look for resources stranded behind separate doors.', 'The solution shares existing capacity instead of reserving more for every village.'],
                    wrong: 'The kingdom still has the same scarce shared resource. More isolated reservations can make queues worse.'
                }
            },
            {
                title: 'A road between the villages',
                story: 'Mira proposed one dispatch hall at the crossroads. A village would request a guard only when a courier was ready to travel; when the trip ended, the guard could serve the next village. The hall did not create guards or promise limitless passage. It simply saw the kingdom’s requests together and assigned available help when work arrived. The council tested the arrangement during market day, when demand shifted from village to village, and watched idle posts give way to a steadier flow.',
                challenge: {
                    prompt: 'When should the dispatch hall assign a guard to a courier?',
                    options: ['When the courier actually needs to travel.', 'At startup, for every possible future trip.', 'Only after the Archive runs out of guards.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition obtains a backend connection when work needs one, rather than permanently reserving a backend connection for every application-side logical connection. Capacity is still finite and must be managed.',
                    hints: ['The hall responds to a real courier, not a forecast.', 'Think “when needed,” not “just in case.”'],
                    wrong: 'Reserving capacity before there is work recreates the idle-resource problem.'
                }
            },
            {
                title: 'The storm at the Archive',
                story: 'Then a storm-delayed caravan occupied the road for hours. Carts carrying urgent letters began to pile up behind it. The dispatch hall marked the slow route apart so one difficult journey could not consume every guard and block the others. Scouts also prepared a second route through another staffed hall. If a route failed, travelers might need to retry; no plan could promise every letter would pass untouched through any disaster. The council kept watch on queues and capacity, and the Archive stayed reachable.',
                challenge: {
                    prompt: 'What is the safest response when one slow caravan starts holding up every other journey?',
                    options: ['Make the caravan travel faster by calling it slow.', 'Separate or limit the slow workload, and prepare another configured route.', 'Let the slow caravan use every guard until it finishes.'],
                    answer: 1,
                    explanation: 'OJP’s adaptive bulkhead can segregate slow-query workloads to help protect shared resources. Its client-side high-availability capabilities can use configured OJP servers, though an in-flight operation is not guaranteed to survive every failure.',
                    hints: ['Isolation limits interference; it does not speed up the slow work.', 'Think workload separation plus a planned alternate server route.'],
                    wrong: 'A slow operation can still occupy a scarce resource; pretending otherwise does not protect other work.'
                }
            }
        ],
        victory: 'The roads are open, the Archive is within reach, and the council has learned that shared capacity needs wise stewards.'
    },
    {
        id: 'space', name: "The Fleet's Last Dock", genre: 'Space exploration',
        badge: 'Fleet Coordinator', palette: ['#10284a', '#46d9e8'],
        description: 'A scattered fleet must coordinate a finite number of docking channels at one orbital station.',
        voice: 'A mission log from the outer orbit',
        acts: [
            {
                title: 'Traffic at Meridian Station',
                story: 'Commander Sol received three distress pings as the fleet converged on Meridian Station. Each ship had claimed docking channels in advance, keeping them reserved through long stretches of empty orbit. New research vessels arrived, but the station reported a queue despite several channels sitting unused on ships that were still coasting. More ships meant more separate reservations, not more station capacity. Sol watched the navigation display fill with amber warnings and realized that no captain could see the fleet-wide picture from a single bridge.',
                challenge: {
                    prompt: 'What would help the fleet use its finite docking capacity more effectively?',
                    options: ['Let each ship reserve more channels before departure.', 'Coordinate docking channels centrally across ships.', 'Build queues into every ship and stop sharing station information.'],
                    answer: 1,
                    explanation: 'Independent application pools can reserve resources separately and leave capacity idle while other applications wait. A shared server-managed pool coordinates demand across participating instances.',
                    hints: ['The problem is that each bridge sees only its own reservations.', 'A fleet-wide view can share available channels among ships.'],
                    wrong: 'More isolated reservations do not make the station’s capacity larger.'
                }
            },
            {
                title: 'The rendezvous protocol',
                story: 'Sol’s engineers opened a coordination channel between ships and station control. A vessel now requested a backend docking resource when a cargo transfer was ready, rather than holding a station channel for an entire voyage. The station assigned available capacity and returned it to the shared pool when the transfer was done. It was no miracle engine: the station still had strict limits, and a surge could still wait. But ships no longer needed to hoard channels against uncertain future cargo.',
                challenge: {
                    prompt: 'When should station control assign a scarce channel to a ship?',
                    options: ['When the ship has work ready to perform.', 'As soon as a ship joins the fleet, whether or not it needs one.', 'Only after every other channel has failed.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition requests a backend connection when it is needed, instead of binding a server connection to every logical connection on every client. It improves sharing but does not remove capacity limits.',
                    hints: ['The channel is for a ready transfer, not a ship waiting in orbit.', 'Choose the moment work actually needs the resource.'],
                    wrong: 'An early reservation can leave a channel unavailable while its ship has no work.'
                }
            },
            {
                title: 'The signal lost in the nebula',
                story: 'A slow survey transfer stalled inside a nebula, and its backlog began to delay urgent navigation queries. Station control isolated the sluggish workload so it could not monopolize every shared channel. Meanwhile, Sol’s bridge knew a second OJP server had been configured and could route new connections there if the first became unavailable. Some work in flight might still need to fail or be retried. Telemetry showed which queues were growing, giving the crew time to adjust before the station was overwhelmed.',
                challenge: {
                    prompt: 'Which plan best protects urgent work from a stalled transfer and a server outage?',
                    options: ['Assume slow transfers will finish faster if left alone.', 'Isolate slow work and use configured client-side server availability.', 'Send every request through one channel to simplify routing.'],
                    answer: 1,
                    explanation: 'Adaptive bulkhead protection segregates slow-query workloads; it does not make them execute faster. Client-side high availability can connect across configured OJP servers, but cannot guarantee every in-flight operation survives a failure.',
                    hints: ['Protect the shared resource from one workload, then consider another configured server.', 'A failover path is useful, but it is not a promise about every operation in flight.'],
                    wrong: 'A single stalled workload or single route can still interfere with other traffic.'
                }
            }
        ],
        victory: 'Meridian Station reports clear channels. Your fleet coordinated its limited resources without pretending they were infinite.'
    },
    {
        id: 'heroes', name: 'The Overloaded City', genre: 'Superheroes',
        badge: 'City Defender', palette: ['#4b245b', '#ffbd4a'],
        description: 'A city’s independent hero command centers compete for the same strained infrastructure.',
        voice: 'A dispatch from the city newsroom',
        acts: [
            {
                title: 'Too many emergency lines',
                story: 'At 8:03, the city’s alert board turned red. Each neighborhood command center kept its own emergency lines open, ready for a crisis that might come later. Across town, an active rescue could not get a line while unused capacity remained locked behind other centers. More neighborhoods had joined the network, each adding another reserve. Captain Vale looked across the skyline: the city did not lack lines altogether; it lacked a way to coordinate them when real emergencies arrived together.',
                challenge: {
                    prompt: 'How can the command centers reduce competition over the city’s limited service lines?',
                    options: ['Reserve extra lines for every center in case of an emergency.', 'Coordinate capacity in a shared server-managed pool.', 'Disable alerts until all centers have equal reservations.'],
                    answer: 1,
                    explanation: 'Independent application pools can keep resources reserved even when idle. Centralized pooling coordinates backend connections across participating applications and their workload.',
                    hints: ['Unused lines are stranded at other centers.', 'The answer must let centers share capacity without inventing more lines.'],
                    wrong: 'Giving every center more separate reservations increases demand on a finite resource.'
                }
            },
            {
                title: 'The shared dispatch network',
                story: 'Vale and the dispatch engineers built a shared coordination layer. Instead of holding a backend line open for every possible call, a center requested a connection when a responder had a real update to send. Once the exchange finished, the resource could serve another center. The city still set limits and watched the load; the network was not magic, and a rush could still queue. Yet a quiet neighborhood no longer kept scarce lines away from a district handling a live rescue.',
                challenge: {
                    prompt: 'A responder is ready to send an update. When should the network acquire backend capacity?',
                    options: ['When the update needs to run.', 'When each center boots, for every hypothetical update.', 'After the entire city is already overloaded.'],
                    answer: 0,
                    explanation: 'Just-in-time connection acquisition uses backend connections when operations need them, avoiding permanent one-to-one reservations for idle logical connections. The backend still has finite capacity.',
                    hints: ['The update is ready now; no need to reserve for hypothetical ones.', 'Choose acquisition at the point of actual need.'],
                    wrong: 'Reserving ahead for idle logical connections wastes resources that could serve active requests.'
                }
            },
            {
                title: 'A rescue across the river',
                story: 'A long-running evidence query began holding a shared line while urgent dispatches waited. The engineers put slow-query work behind a separate protection boundary so it could not take over every line. Vale also verified that clients knew about another configured OJP server if the first became unavailable. A rescue already in transit could still be interrupted, so teams planned retries for safe operations and watched the metrics board. The city recovered by containing the bottleneck, not by claiming that a slow query had become fast.',
                challenge: {
                    prompt: 'What should the team do when slow work threatens unrelated requests?',
                    options: ['Isolate slow workloads and configure alternate OJP servers for availability.', 'Increase the slow query’s priority until it owns every line.', 'Promise every interrupted operation will continue without interruption.'],
                    answer: 0,
                    explanation: 'Adaptive bulkhead protection can segregate slow-query workloads, and OJP’s client-side HA capabilities span configured OJP servers. Neither automatically speeds SQL nor guarantees uninterrupted in-flight work during arbitrary failures.',
                    hints: ['Contain the slow workload and prepare a route to another configured server.', 'Avoid promising that failures can never interrupt an operation.'],
                    wrong: 'Letting slow work consume all shared capacity makes other work less resilient.'
                }
            }
        ],
        victory: 'The city is safer because its heroes coordinate, contain bottlenecks, and keep a backup route ready.'
    },
    {
        id: 'gaming', name: 'The Resource Dungeon', genre: 'Video games & RPG',
        badge: 'Resource Master', palette: ['#263450', '#85e27d'],
        description: 'An adventuring party faces a resource boss with too many inventory slots tied up.',
        voice: 'A party journal, annotated between levels',
        acts: [
            {
                title: 'The inventory trap',
                story: 'At level seven, Nia’s party reached the Vault Warden and found the inventory grid nearly full. Every guild had reserved a stack of keys for a possible future run, even while other teams stood at the locked door with no key to use. As the guild count grew, so did these private stashes. The dungeon had not run out of keys in total; too many were sitting idle in separate inventories. Nia opened the party map and searched for a way to share the scarce slots.',
                challenge: {
                    prompt: 'How should the guilds handle a finite stock of dungeon keys?',
                    options: ['Give each guild a larger private stash.', 'Coordinate a shared key pool for active runs.', 'Have every adventurer hold one key at all times.'],
                    answer: 1,
                    explanation: 'Separate application-side pools can strand reserved resources. A central pool lets active applications share server-managed backend connections within configured limits.',
                    hints: ['Private stashes hide idle keys from players who need them.', 'Coordinate access to the shared capacity.'],
                    wrong: 'More private reservations can fill the inventory without helping the adventurers at the door.'
                }
            },
            {
                title: 'The party queue',
                story: 'Nia persuaded the guilds to use a shared vault at the party hub. A key was checked out when a run actually began and returned when that work finished. No key was conjured from thin air, and the Warden could still make a queue if every key was busy. But an idle guild no longer occupied a key merely because it might start a run later. When player activity shifted from one guild to another, the vault could respond to the real dungeon traffic.',
                challenge: {
                    prompt: 'When should a backend key be checked out for a party?',
                    options: ['When the party’s operation is ready to run.', 'For every possible run as soon as the guild signs in.', 'Only after the party has waited through a full queue.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition obtains a backend connection for actual work rather than permanently reserving one for every application-side logical connection. It helps share capacity; it does not remove pool limits.',
                    hints: ['A key is needed for a run, not for a player who is standing idle.', 'Think about when the operation is ready.'],
                    wrong: 'Checking out resources for hypothetical work leaves less capacity for active parties.'
                }
            },
            {
                title: 'The Warden’s slow spell',
                story: 'The Warden cast a slow spell that kept one key occupied, and ordinary party actions began to stall. Nia’s team separated slow-query encounters behind a bulkhead so one workload could not dominate every shared slot. They also configured a second hub and made sure the client could connect across available hubs. A party action already in progress might still be interrupted if a hub failed, so safe moves needed a retry plan. The dashboard exposed the growing queue before the next level began.',
                challenge: {
                    prompt: 'Which strategy helps the party resist a slow workload and a hub outage?',
                    options: ['Use bulkhead isolation and configured client-side server availability.', 'Expect the bulkhead to make the Warden’s spell finish faster.', 'Remove all limits so the dungeon cannot queue.'],
                    answer: 0,
                    explanation: 'OJP’s adaptive bulkhead can segregate slow-query workloads; it does not accelerate slow SQL. Client-side HA can use configured OJP servers, though it does not guarantee every in-flight operation survives a failure.',
                    hints: ['Isolation protects other work; it does not change the slow query itself.', 'An alternate configured server is not the same as a guarantee for every active move.'],
                    wrong: 'No unbounded resource system can be promised; safe limits and isolation matter.'
                }
            }
        ],
        victory: 'The Warden is beaten. Your party won by managing shared resources, not by hoarding every item.'
    },
    {
        id: 'anime', name: 'The Synchronization Trials', genre: 'Anime-inspired adventure',
        badge: 'Synchronization Master', palette: ['#472766', '#ff6b91'],
        description: 'Rival teams discover that coordination beats hoarding a limited supply of energy.',
        voice: 'A spirited training-ground chronicle',
        acts: [
            {
                title: 'The scattered energy cores',
                story: 'At the first bell, rival teams rushed to the summit arena. Each dojo had reserved energy cores for every possible technique, though many fighters were still warming up. Teams with active trials waited at empty charging stations while unused cores sat in private lockers. More dojos joined the tournament, and the queue stretched around the mountain. Coach Ren saw the pattern in the practice board: the energy was there, but separate reservations kept the teams from using it together.',
                challenge: {
                    prompt: 'What should the dojos change to make better use of the shared energy supply?',
                    options: ['Reserve even more cores before the tournament.', 'Coordinate a shared pool of available cores.', 'Keep each team’s locker private and increase the queue.'],
                    answer: 1,
                    explanation: 'Independent connection pools can hold resources idle while another application waits. Centralized pooling coordinates backend resources across participating applications.',
                    hints: ['The cores are stranded in private lockers.', 'Sharing a managed pool addresses the coordination problem.'],
                    wrong: 'Larger private reserves consume more capacity without making it available to the waiting team.'
                }
            },
            {
                title: 'A synchronized technique',
                story: 'Ren taught the teams a synchronized technique: ask for a core when a fighter was ready to perform, then return it when the move finished. The central arena steward could see demand across the dojos and assign available capacity in the moment. The technique did not generate limitless energy; if all cores were working, another fighter had to wait. Still, the quiet teams stopped holding cores just in case, and the tournament moved with a rhythm no single dojo could have created alone.',
                challenge: {
                    prompt: 'When is the right moment for a fighter’s technique to request a core?',
                    options: ['When the fighter is ready to perform the technique.', 'When the dojo first opens, for every possible technique.', 'Only when the arena has already exhausted its supply.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition requests backend connections as operations need them. This avoids permanently mapping every logical client connection to a backend connection, while respecting finite capacity.',
                    hints: ['The fighter is ready for action now.', 'Acquire for real work, not an idle possibility.'],
                    wrong: 'Holding a core for a technique that has not started blocks active fighters from sharing it.'
                }
            },
            {
                title: 'The trial of the long strike',
                story: 'A long-running strike occupied a core far beyond the expected count, and quick support moves began to fall behind. The steward adapted the arena’s bulkhead to segregate slow-query work and protect shared capacity. Ren also confirmed that clients could use another configured OJP server if the first stopped responding. No one promised an active strike would finish through any failure; they practiced safe retries and watched the observability board. The rivals passed the final trial by protecting one another’s chance to act.',
                challenge: {
                    prompt: 'How can the arena reduce interference from a slow strike without overpromising?',
                    options: ['Segregate slow work and use configured client-side HA, while planning for interrupted operations.', 'Assume a bulkhead makes every strike faster.', 'Allow one slow strike to use all shared cores.'],
                    answer: 0,
                    explanation: 'Adaptive bulkheads isolate slow-query workloads rather than speeding them up. Client-side high availability supports configured OJP servers, but an operation in flight may still be interrupted.',
                    hints: ['Separate the slow workload and keep a realistic failure plan.', 'A backup route helps new connections; it cannot promise every move will survive.'],
                    wrong: 'A slow workload that consumes all shared resources can interfere with other teams.'
                }
            }
        ],
        victory: 'The teams finish as rivals no longer: they have mastered the strength of a shared rhythm.'
    },
    {
        id: 'mystery', name: 'The Case of the Missing Connections', genre: 'Mystery & detective',
        badge: 'Master Investigator', palette: ['#242c3d', '#d3b06b'],
        description: 'A detective follows the clues behind a healthy system that is mysteriously out of capacity.',
        voice: 'Case notes from Detective Rowan',
        acts: [
            {
                title: 'The empty desk clue',
                story: 'Detective Rowan arrived at the data bureau after a report that new requests could not get a connection. The service looked healthy, but several application teams each kept their own pool, sized for peak demand. Rowan found idle connections at quiet desks and waiting requests at busy ones. As more replicas appeared, their separate reservations grew, too. No single team had broken the rules; the missing capacity was hidden in plain sight, split among pools that could not see each other.',
                challenge: {
                    prompt: 'Which clue best explains why requests wait while connections appear idle elsewhere?',
                    options: ['Separate pools reserve capacity that cannot be shared across applications.', 'The database has unlimited connections, so the queue must be imaginary.', 'Every application needs its own fixed maximum regardless of demand.'],
                    answer: 0,
                    explanation: 'Independent pools may reserve backend resources that are idle in one application but unavailable to another. OJP centralizes backend pooling to coordinate participating instances.',
                    hints: ['The idle connections belong to a different team’s pool.', 'Look for a coordination boundary, not a missing database.'],
                    wrong: 'Separate fixed reservations can create exactly the mismatch Rowan observed.'
                }
            },
            {
                title: 'The request-time fingerprint',
                story: 'Rowan traced one request from a ready application operation to the database. The bureau’s new coordination layer acquired backend capacity only when the operation needed it, instead of tying one backend connection to every client-side logical connection in advance. On completion, it returned that resource to the managed pool. Logs showed who waited and when, while the pool retained its own limits. The detective had found the mechanism, not a loophole: busy workloads could still reach capacity, but idle reservations were no longer the default.',
                challenge: {
                    prompt: 'What does the request-time clue tell you about backend connection acquisition?',
                    options: ['Acquire a backend connection when work needs it, within the pool’s limits.', 'Keep one backend connection permanently for every logical client connection.', 'Ignore pool limits because acquisition happens just in time.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition avoids holding a backend connection for each idle logical connection. It does not mean connections are free or that capacity limits disappear.',
                    hints: ['The operation caused the acquisition, not an idle client.', '“Just in time” still works within finite pool limits.'],
                    wrong: 'Just-in-time acquisition changes when a resource is obtained, not the fact that capacity is finite.'
                }
            },
            {
                title: 'The slow-query alibi',
                story: 'A long report turned out to be occupying shared resources while short lookups queued behind it. Rowan compared the trace with the service’s metrics and found a second configured OJP server ready for new connections. The team used adaptive bulkhead protection to segregate the slow-query workload and reduce interference. Rowan did not claim the report would run faster, or that a failing server could never interrupt work already in flight. The case closed with a clearer capacity picture, a safer boundary, and a practical failover plan.',
                challenge: {
                    prompt: 'Which conclusion is supported by the evidence?',
                    options: ['Isolation can protect other workloads; configured client-side HA helps, but in-flight work may still be interrupted.', 'Bulkheads make slow SQL execute faster and guarantee transparent recovery.', 'Metrics alone create more database connections.'],
                    answer: 0,
                    explanation: 'OJP’s adaptive bulkhead can segregate slow-query workloads, and its client-side HA can use configured OJP servers. Metrics aid observability; neither isolation nor HA guarantees uninterrupted completion of every operation.',
                    hints: ['Separate what the architecture protects from what it cannot promise.', 'Isolation is not acceleration, and failover is not a guarantee about in-flight work.'],
                    wrong: 'The evidence supports workload isolation and configured failover capability, not zero interruption.'
                }
            }
        ],
        victory: 'Case closed: the missing capacity was not missing at all—it was trapped behind disconnected reservations.'
    },
    {
        id: 'racing', name: 'The Pit Lane Bottleneck', genre: 'Racing & sports',
        badge: 'Pit Lane Strategist', palette: ['#402326', '#ff795e'],
        description: 'Racing teams learn to coordinate scarce pit resources under changing race-day demand.',
        voice: 'Live commentary from the pit wall',
        acts: [
            {
                title: 'The crowded pit wall',
                story: 'The Grand Circuit’s opening lap was clean, but the pit wall flashed warnings. Every team had reserved service bays and crew for possible stops, though some cars were still running long stints. A team entering for fresh tires waited while empty bays remained locked behind other teams’ plans. New entrants made the reservations grow faster than the circuit could add capacity. Strategist Imani watched the live board and saw a race decided not by speed, but by a resource plan that could not respond to changing demand.',
                challenge: {
                    prompt: 'What would help pit crews respond when demand shifts between teams?',
                    options: ['Reserve more bays for every team at all times.', 'Coordinate access to a shared pool of service capacity.', 'Keep all bays private even when a team is idle.'],
                    answer: 1,
                    explanation: 'Independent connection pools can strand idle capacity. A server-managed shared pool coordinates backend resources across multiple participating application instances.',
                    hints: ['Some bays are idle while another team waits.', 'A coordinated pool can respond as demand shifts.'],
                    wrong: 'More private reservations do not make finite shared capacity more available.'
                }
            },
            {
                title: 'The just-in-time stop',
                story: 'Imani changed the race protocol: a crew requested a backend bay when a car was ready for actual service. When the stop was complete, that resource could be used by another team. The pit controller kept a deliberate capacity limit and could still queue cars if every bay was occupied. But teams no longer held bays for a stop that might happen much later. As weather shifted the race strategy, crews could follow the work instead of defending a static reservation.',
                challenge: {
                    prompt: 'When should the pit controller assign backend capacity?',
                    options: ['When a service operation is ready to run.', 'At registration, for every hypothetical pit stop.', 'After all teams have already exceeded the circuit limit.'],
                    answer: 0,
                    explanation: 'Just-in-time acquisition obtains backend connections when operations need them rather than keeping one reserved per idle logical connection. Pool limits still apply.',
                    hints: ['The car is ready for service now.', 'Acquire capacity for a real operation instead of an imagined stop.'],
                    wrong: 'A bay reserved for an operation that has not started cannot serve a team that needs it now.'
                }
            },
            {
                title: 'The red flag workload',
                story: 'A slow tire analysis began holding a scarce resource while short race-control queries piled up. The controller used adaptive bulkhead protection to segregate the slow-query workload, keeping it from monopolizing shared capacity. Imani also checked that clients were configured to connect across more than one OJP server if a server became unavailable. A red flag could still interrupt work already underway, so the crew prepared safe retries. Live metrics helped them spot the growing queue before the next lap.',
                challenge: {
                    prompt: 'What is the accurate resilience strategy for the stalled tire analysis?',
                    options: ['Segregate slow work and configure another OJP server, while planning for possible interruption.', 'Expect workload isolation to make the analysis run faster.', 'Remove all resource limits so nothing can queue.'],
                    answer: 0,
                    explanation: 'Bulkhead protection limits interference from slow-query workloads, while client-side HA can use configured OJP servers. This does not speed the query or guarantee every in-flight operation survives a failure.',
                    hints: ['Contain the impact, and prepare a realistic route for new connections.', 'Do not promise either faster SQL or uninterrupted operations.'],
                    wrong: 'Allowing slow work to occupy all resources undermines other workloads and offers no failure plan.'
                }
            }
        ],
        victory: 'The checkered flag falls on a smarter strategy: the pit wall manages the shared budget, not just each team’s reserve.'
    },
    {
        id: 'engineering', name: 'The Connection Budget', genre: 'Engineering reality',
        badge: 'Connection Architect', palette: ['#153b59', '#55c8a8'],
        description: 'A production team maps application replicas, JDBC pools, and a finite database connection budget.',
        voice: 'An incident review from the platform team',
        acts: [
            {
                title: 'The replica multiplication',
                story: 'At 09:14, a deployment doubled the application replicas and database connection attempts spiked. Each JVM had its own JDBC pool, sized for its local peak. Some logical connections were idle, but their independent pools still held backend sessions while another replica waited. The database had a fixed connection budget; adding replicas multiplied the configured reservations, not the budget. The platform team pulled together the deployment graph and asked how the fleet could scale without every application instance defending its own slice.',
                challenge: {
                    prompt: 'Why can independently sized JDBC pools strain a fixed database connection budget as replicas grow?',
                    options: ['Each replica may reserve backend capacity independently, including while some resources are idle.', 'The database creates extra capacity automatically for every new JVM.', 'A larger application-side pool reduces the database’s total demand by definition.'],
                    answer: 0,
                    explanation: 'Independent application-side pools can multiply backend reservations as replicas scale. A centralized server-side pool gives participating instances a coordinated view of backend capacity.',
                    hints: ['Count the pools as well as the database limit.', 'Idle sessions in one replica may not be available to another replica.'],
                    wrong: 'The database limit remains finite; application-side pool sizes do not automatically coordinate.'
                }
            },
            {
                title: 'A coordinated connection path',
                story: 'The team evaluated OJP’s Type 3 JDBC path: a driver in each application communicates over the network with OJP servers, which manage backend database pools. An application can request a logical connection without permanently binding a backend session for every idle logical connection. A backend connection is acquired as work needs it, then managed within the server-side pool. This was not cost-free or unlimited, and did not erase database-specific behavior; it changed where connection coordination happened and made capacity easier to govern across replicas.',
                challenge: {
                    prompt: 'Which statement accurately describes OJP’s connection path and just-in-time acquisition?',
                    options: ['A Type 3 JDBC driver communicates with OJP servers, which manage backend pools and acquire connections for work as needed.', 'Every logical connection permanently reserves a database session, regardless of work.', 'OJP removes database capacity limits and makes connection use costless.'],
                    answer: 0,
                    explanation: 'OJP uses a JDBC Type 3 client/server architecture. Its servers manage backend pools; just-in-time acquisition avoids unnecessary permanent backend reservations, while pool limits and connection costs remain.',
                    hints: ['Trace client driver → OJP server → backend database.', 'Just in time means acquired when work needs it, not limitless.'],
                    wrong: 'OJP coordinates backend connections; it does not remove limits or costs.'
                }
            },
            {
                title: 'The mixed workload incident',
                story: 'A slow analytical query began holding shared resources while short OLTP work queued. The team enabled adaptive bulkhead protection to segregate slow-query workloads; they did not expect it to accelerate the query. They also configured multiple OJP servers so the client could use available servers if one failed, knowing work in flight might be interrupted. Metrics made pool pressure visible, while the database’s own limits remained in force. The incident review ended with isolation boundaries, capacity alarms, and a retry policy for operations safe to retry.',
                challenge: {
                    prompt: 'Which response is technically sound for a slow query and an OJP server failure?',
                    options: ['Use slow-workload isolation, configure client-side server availability, and plan for in-flight interruption.', 'Assume bulkheads optimize SQL execution and HA makes failures invisible.', 'Switch to an unrelated database and expect SQL differences to disappear.'],
                    answer: 0,
                    explanation: 'OJP can segregate slow-query workloads, provides client-side HA across configured OJP servers, and offers observability. It does not automatically make SQL faster or guarantee every in-flight operation survives; switching database technologies may require application changes.',
                    hints: ['Keep isolation, failover, and query execution speed distinct.', 'OJP’s alternate servers are configured OJP servers, not an automatic database migration.'],
                    wrong: 'The correct design protects shared resources but stays honest about SQL and failure behavior.'
                }
            }
        ],
        victory: 'The incident is contained. Your architecture now treats the connection budget as shared, finite, and observable.'
    }
];

export const BADGE_DESCRIPTIONS = Object.fromEntries(WORLDS.map(world => [
    world.id,
    `${world.badge}, awarded for completing ${world.name}.`
]));
