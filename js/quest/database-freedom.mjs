export const DATABASE_FREEDOM_WORLDS = [
    {
        id: 'database-freedom-fantasy', name: 'The Kingdom Without Borders', genre: 'Epic fantasy',
        badge: 'Keeper of the Open Roads', icon: 'fantasy', palette: ['#244c3b', '#d2a84b'],
        description: 'Mira connects three kingdoms without forcing them to become identical.',
        voice: 'A mapmaker’s account of the open roads',
        acts: [
            {
                title: 'The Three Kingdoms',
                story: 'Three kingdoms had traded with one another for centuries. But each kingdom had different border rules, and each required travelers to use a separate travel guild. Merchants crossing all three kingdoms needed three memberships, three sets of booking procedures, and three groups of agents. When one guild changed its fees or processes, the merchants had little choice but to comply. Mira, the Royal Cartographer, wondered why organizing a journey across the continent had become more complicated than the journey itself.',
                challenge: {
                    prompt: 'What is the merchants’ main difficulty?',
                    options: ['Each kingdom has different customs, so trade between kingdoms is impossible.', 'Managing journeys requires separate administrative systems and specialist arrangements for each kingdom.', 'Merchants should avoid crossing borders and trade only within their home kingdom.'],
                    answer: 1,
                    explanation: 'Different database-specific proxies or platform services can require distinct deployment stacks, configuration models, operational procedures, and expertise.'
                }
            },
            {
                title: 'The Guild of Open Roads',
                story: 'Mira founded the Guild of Open Roads. Merchants could now organize their journeys through one shared travel service. The guild worked with local agents who understood each kingdom’s border procedures. A merchant traveling north could book passage through the same service used for southern journeys, even though the border rules were different. The guild did not erase the kingdoms’ customs. It simply removed the need for every merchant to maintain a separate relationship with every travel guild.',
                challenge: {
                    prompt: 'What makes the Guild of Open Roads useful?',
                    options: ['It provides a common way to organize travel while respecting each kingdom’s local requirements.', 'It forces all kingdoms to adopt exactly the same customs.', 'It eliminates the need for local agents who understand the borders.'],
                    answer: 0,
                    explanation: 'OJP provides a common connectivity architecture using its JDBC Type 3 client and server-managed pools. The server uses appropriate backend JDBC drivers for different database technologies.'
                }
            },
            {
                title: 'A Kingdom Changes Its Laws',
                story: 'Years later, the Northern Kingdom changed its border procedures. Previously, merchants using a northern-only travel guild had been completely dependent on that guild’s arrangements. Now, the Guild of Open Roads could update its northern route procedures while retaining its overall travel network. Merchants still needed the right documents and had to follow the new laws. But they didn’t need to rebuild their entire travel organization. Mira smiled. Freedom, she realized, wasn’t the absence of rules. It was the ability to change without losing everything already built.',
                challenge: {
                    prompt: 'What does architectural freedom actually mean?',
                    options: ['Every kingdom must use identical laws before the shared service can operate.', 'A shared travel service makes all future border changes automatically compatible.', 'The common travel infrastructure can be retained while adapting to changed local requirements.'],
                    answer: 2,
                    explanation: 'OJP can reduce dependence on database-specific connectivity infrastructure. However, changing database engines may still require SQL, schema, data migration, and behavioral compatibility work.'
                }
            }
        ],
        victory: 'Mira connected the kingdoms without forcing them to become identical. Their differences remained, but the roads between them belonged to everyone.'
    },
    {
        id: 'database-freedom-space', name: 'The Independent Fleet', genre: 'Space exploration',
        badge: 'Galactic Pathfinder', icon: 'space', palette: ['#10284a', '#46d9e8'],
        description: 'Commander Sol builds a common coordination network for a diverse fleet.',
        voice: 'A navigation log from the independent fleet',
        acts: [
            {
                title: 'A Galaxy of Incompatible Ports',
                story: 'Commander Sol commanded a fleet that traded across three star systems. Each system operated different spaceports with different docking-control technology. The fleet maintained separate coordination software for every system. Engineers spent more time updating docking integrations and operating procedures than planning actual voyages. Whenever a spaceport operator changed its platform, Sol’s crew had to revisit another dedicated integration. The fleet could travel anywhere. But its operational systems were becoming increasingly dependent on the specific technologies used by each destination.',
                challenge: {
                    prompt: 'What is the underlying architectural problem?',
                    options: ['Maintaining separate control systems for every port creates duplication and operational dependencies.', 'Different planets must adopt identical docking protocols before interstellar travel is possible.', 'All ships should use the same engine to eliminate differences between spaceports.'],
                    answer: 0,
                    explanation: 'Database-specific proxies and provider-managed connectivity layers can create multiple infrastructure stacks when an organization operates across different database technologies or cloud platforms.'
                }
            },
            {
                title: 'The Universal Coordination Network',
                story: 'Sol’s engineers created a common fleet coordination network. Every ship used the same interface to request docking arrangements. The network communicated with the appropriate local port systems through compatible adapters. Some ports still required unusual docking patterns. Others had special clearance procedures. The coordination network understood where to send requests, but it didn’t pretend that every spaceport operated identically. Sol could now manage the fleet’s docking arrangements through a common system without replacing the underlying ports.',
                challenge: {
                    prompt: 'What should the common coordination network do?',
                    options: ['Require every spaceport to replace its existing docking systems.', 'Coordinate requests through one interface while using appropriate integrations for each port.', 'Automatically make all docking procedures and local laws identical.'],
                    answer: 1,
                    explanation: 'OJP supports multiple relational database technologies through appropriate JDBC drivers on the server side, while applications communicate with OJP using a common Type 3 JDBC driver.'
                }
            },
            {
                title: 'The Planet That Changed Its Rules',
                story: 'The planet Vesper replaced its aging spaceport system. Previously, such a change required the fleet to redesign a dedicated section of its coordination infrastructure. This time, the engineers updated Vesper’s integration with the common network. The fleet could retain its broader coordination system. However, pilots still had to learn the new approach procedures, and the local adapter required validation. Sol approved the upgrade. The fleet was more independent, not because every planet was the same, but because one planet’s technology no longer dictated the architecture of the entire fleet.',
                challenge: {
                    prompt: 'What is the realistic benefit of the new architecture?',
                    options: ['The fleet can dock anywhere without needing any integration changes.', 'Spaceport operators can change their systems without notifying visiting ships.', 'The fleet can reuse its common coordination infrastructure while adapting to changed local systems.'],
                    answer: 2,
                    explanation: 'A database-agnostic connectivity layer can reduce infrastructure-specific coupling. It does not guarantee that changing the underlying database requires no application or configuration changes.'
                }
            }
        ],
        victory: 'Sol’s fleet remained free to explore new systems. It had stopped confusing technological compatibility with dependence on one provider.'
    },
    {
        id: 'database-freedom-heroes', name: 'The Alliance of Independent Cities', genre: 'Superheroes',
        badge: 'Defender of Independence', icon: 'heroes', palette: ['#4b245b', '#ffbd4a'],
        description: 'Captain Vale gives allied cities a shared system without locking them to one supplier.',
        voice: 'A briefing from the Continental Hero Alliance',
        acts: [
            {
                title: 'Three Cities, Three Systems',
                story: 'Captain Vale attended a meeting of the Continental Hero Alliance. Three cities had agreed to cooperate during major disasters. But their rescue robots came from three different manufacturers. Each city operated its own command platform, maintenance console, and dispatch procedures. Coordinating a cross-city rescue required specialists from all three systems. Worse, one manufacturer had begun charging expensive fees for access to its proprietary coordination platform. Vale was frustrated. The cities had formed an alliance, but their technology was keeping them apart.',
                challenge: {
                    prompt: 'What makes the alliance difficult to operate?',
                    options: ['The cities have different rescue needs, so cooperation cannot work.', 'Each city depends on separate manufacturer-specific command infrastructure, increasing complexity.', 'The alliance needs to purchase identical robots for every city before it can coordinate rescues.'],
                    answer: 1,
                    explanation: 'Technology-specific connectivity solutions can increase operational complexity and vendor dependence when organizations support heterogeneous database environments.'
                }
            },
            {
                title: 'The Independent Dispatch Alliance',
                story: 'Vale proposed an independent dispatch platform. Every city’s superhero teams would submit coordination requests through one shared system. Behind the scenes, the platform used adapters that understood the different robot manufacturers’ systems. The alliance could coordinate resources without forcing every city to buy the same equipment. A lifting robot from one manufacturer still had different controls from a medical robot built by another. The common platform didn’t erase those differences. It separated coordination from the machinery used to perform the work.',
                challenge: {
                    prompt: 'What makes the new alliance platform more flexible?',
                    options: ['It provides common coordination while retaining manufacturer-specific integrations where needed.', 'It guarantees that every robot can perform every other robot’s functions.', 'It requires each city to abandon its existing robots immediately.'],
                    answer: 0,
                    explanation: 'OJP separates connectivity management from individual database wire protocols by using JDBC drivers on the server side. Different database capabilities and SQL semantics still matter.'
                }
            },
            {
                title: 'Breaking the Contract',
                story: 'A year later, one city decided to replace its robot supplier. Under its previous arrangement, the change would have meant replacing a large part of the proprietary command infrastructure. Now, the alliance could retain its common coordination platform. Engineers still had to integrate the replacement robots and validate their operations. The migration took planning, but it didn’t force every allied city to change technology. Vale looked across the rescue command center. For the first time, the alliance was free to choose equipment based on its needs rather than the limitations of one supplier.',
                challenge: {
                    prompt: 'What has the alliance gained?',
                    options: ['The ability to replace any robot manufacturer with no integration or testing work.', 'A guarantee that all future robot suppliers will use identical controls.', 'Greater freedom to change suppliers without replacing the entire coordination architecture.'],
                    answer: 2,
                    explanation: 'OJP can help reduce vendor lock-in at the connectivity infrastructure layer. Switching databases still requires checking application compatibility, SQL dialects, migration procedures, and operational behavior.'
                }
            }
        ],
        victory: 'The cities remained different, but they were no longer divided by their technology. Their alliance was built on cooperation rather than dependence.'
    },
    {
        id: 'database-freedom-gaming', name: 'The Gates of a Thousand Realms', genre: 'Gaming & RPG',
        badge: 'Master of the Open Realms', icon: 'gaming', palette: ['#263450', '#85e27d'],
        description: 'Nia organizes expeditions through a common portal network across unique realms.',
        voice: 'A portal expedition journal',
        acts: [
            {
                title: 'The Guild of Locked Portals',
                story: 'Nia’s guild explored many magical realms. The Fire Realm required a Flame Gatekeeper. The Frost Realm required a separate Ice Gatekeeper. The Shadow Realm had its own portal guild. Every gatekeeper maintained different booking procedures, fees, and access rules. As the adventurers explored more realms, managing portal access became expensive and complicated. One portal guild even prohibited travelers from using competing services. Nia wondered why the guild had become so dependent on the gatekeepers when its real purpose was to explore.',
                challenge: {
                    prompt: 'What is restricting the adventurers’ freedom?',
                    options: ['Every realm uses different kinds of magic.', 'The guild has too many adventurers with different abilities.', 'Access to different realms depends on separate, restrictive portal-management systems.'],
                    answer: 2,
                    explanation: 'Database-specific connectivity stacks can introduce operational complexity and provider dependence when applications need to work with different database engines.'
                }
            },
            {
                title: 'The Open Portal Network',
                story: 'Nia discovered an ancient network connecting the realms. The network provided one common way to organize portal journeys. Each destination still had a guardian who understood its particular magic. To reach the Frost Realm, travelers needed the correct frost rune. To reach the Fire Realm, they needed the appropriate fire spell. But the guild no longer needed separate portal-management organizations for every destination. The network coordinated journeys while preserving each realm’s unique requirements. For the first time, Nia could plan an expedition across multiple realms through one shared system.',
                challenge: {
                    prompt: 'What does the Open Portal Network actually simplify?',
                    options: ['It provides a common coordination system while retaining realm-specific magic and requirements.', 'It makes every spell usable in every realm without modification.', 'It eliminates the need to understand how different realms operate.'],
                    answer: 0,
                    explanation: 'OJP can provide common connectivity and connection management for multiple supported databases. It does not translate arbitrary SQL dialects or remove database-specific functionality.'
                }
            },
            {
                title: 'The Realm That Changed Its Magic',
                story: 'The Shadow Realm underwent a magical transformation. Its ancient portal runes no longer worked. Under the old arrangement, the guild might have needed to replace an entire portal-management service. With the Open Portal Network, the guild retained its common travel infrastructure. Its mages updated the Shadow Realm’s integration and learned the new runes. The change still required effort. But the guild’s other journeys and shared coordination system remained intact. Nia understood the meaning of freedom. It wasn’t the ability to ignore differences. It was the ability to adapt without starting over.',
                challenge: {
                    prompt: 'Why is the Open Portal Network valuable during change?',
                    options: ['It guarantees that old spells work in every new realm.', 'It allows the guild to retain common infrastructure while updating realm-specific integrations.', 'It prevents realms from changing their magical rules.'],
                    answer: 1,
                    explanation: 'OJP can reduce coupling to database-specific proxy infrastructure, but database migrations may still require application changes, SQL adaptation, and careful validation.'
                }
            }
        ],
        victory: 'Nia unlocked the final realm, not by mastering every portal guild, but by building a way to travel beyond their limitations.'
    },
    {
        id: 'database-freedom-anime', name: 'The Path Beyond the Dojos', genre: 'Anime',
        badge: 'Master of the Open Path', icon: 'anime', palette: ['#66304f', '#f4a8d5'],
        description: 'Akira connects three academies while preserving their different disciplines.',
        voice: 'A student’s training journal',
        acts: [
            {
                title: 'The Divided Academies',
                story: 'Akira dreamed of studying at the three greatest martial arts academies. The Mountain Dojo specialized in strength. The River Dojo taught speed. The Sky Dojo focused on precision. But each academy used a different training-management system. Registering for training, reserving equipment, and tracking schedules required separate arrangements with each school. When one academy changed its provider, students had to learn another complicated process. Akira wanted to learn different fighting styles. Instead, he was spending his time learning different administrative systems.',
                challenge: {
                    prompt: 'What is making Akira’s training unnecessarily difficult?',
                    options: ['The academies teach different martial arts, so they cannot cooperate.', 'Each academy requires a separate system for managing essentially similar administrative tasks.', 'Akira needs to choose one fighting style and abandon the others.'],
                    answer: 1,
                    explanation: 'Organizations using different database technologies may need multiple database-specific proxy and connection-management stacks, adding configuration, maintenance, and specialist requirements.'
                }
            },
            {
                title: 'The Academy Alliance',
                story: 'Master Ren proposed a new alliance. The academies would share a common training-management platform. Students could organize equipment reservations and training sessions through one system. The platform integrated with each academy’s existing equipment and procedures. It didn’t make every academy teach the same techniques. A student practicing speed at the River Dojo still needed to learn the River Dojo’s methods. But the administrative complexity of moving between schools was greatly reduced. Akira could finally concentrate on mastering the skills he had come to learn.',
                challenge: {
                    prompt: 'What is the main benefit of the academy’s shared platform?',
                    options: ['Every martial art becomes interchangeable.', 'All students can use specialized equipment without learning its rules.', 'Common administrative functions can be reused across academies while their unique training methods remain.'],
                    answer: 2,
                    explanation: 'OJP offers a common JDBC-based connectivity management architecture across supported database technologies, while application SQL and database-specific behaviors remain distinct.'
                }
            },
            {
                title: 'The Choice of a New Master',
                story: 'The Sky Dojo announced that it was replacing its training equipment supplier. Previously, the school depended heavily on the supplier’s proprietary management platform. The Academy Alliance gave it another option. The new equipment still required integration, and instructors needed to learn how to operate it. But the shared scheduling and coordination platform could remain. Akira watched the school change without leaving the alliance. Master Ren smiled. “A true master chooses the tools that serve the purpose. The tools should not choose the master’s path.”',
                challenge: {
                    prompt: 'What does the shared architecture allow the Sky Dojo to do?',
                    options: ['Change its equipment supplier while retaining common infrastructure, with necessary integration work.', 'Install any equipment without checking compatibility.', 'Keep all supplier-specific software forever because it is now part of the alliance.'],
                    answer: 0,
                    explanation: 'OJP can reduce dependence on a database-specific connectivity stack. It does not eliminate migration, compatibility testing, or database-specific engineering.'
                }
            }
        ],
        victory: 'Akira mastered techniques from all three academies. His greatest discovery was that learning from different traditions didn’t require surrendering his independence.'
    },
    {
        id: 'database-freedom-mystery', name: 'The Case of the Three Locked Systems', genre: 'Mystery',
        badge: 'Independence Investigator', icon: 'mystery', palette: ['#29364f', '#9bc4ff'],
        description: 'Detective Rowan finds duplicated connectivity stacks—not a need to replace databases.',
        voice: 'A case file from the technology headquarters',
        acts: [
            {
                title: 'Three Databases, Three Problems',
                story: 'Detective Rowan entered the headquarters of a multinational technology company. Three engineering teams had reported the same problem. The first operated PostgreSQL. The second used Oracle. The third used SQL Server. Each team had adopted a different database-specific connectivity solution. Their monitoring dashboards, configuration procedures, deployment requirements, and operational knowledge were fragmented. Whenever the organization introduced another database technology, it needed to evaluate another connectivity stack. Rowan examined the evidence. The databases were serving different business needs. The unnecessary duplication was in how connectivity infrastructure was being managed.',
                challenge: {
                    prompt: 'What is the architectural concern Rowan has uncovered?',
                    options: ['Using multiple relational databases is always the wrong choice.', 'All three databases must be replaced with one vendor’s technology.', 'Separate connectivity stacks can multiply operational complexity across the organization.'],
                    answer: 2,
                    explanation: 'Database-specific proxies and managed connectivity services can require distinct tooling, configuration, observability, and operational expertise.'
                }
            },
            {
                title: 'The Common Connection Layer',
                story: 'Rowan’s investigation led to an unusual possibility. Instead of introducing another database-specific proxy, the engineers could use a common connectivity layer. Applications would communicate with that layer through a JDBC Type 3 driver. The servers behind it would use the appropriate JDBC drivers to access the different databases. The database engines didn’t have to be replaced. Their SQL dialects and capabilities would remain different. But the organization could manage key aspects of connection pooling and connectivity through a more consistent architecture. The first test succeeded. Rowan had found the missing common denominator.',
                challenge: {
                    prompt: 'Which statement accurately describes the proposed solution?',
                    options: ['The common connectivity layer automatically translates every SQL statement between PostgreSQL, Oracle, and SQL Server.', 'The common layer manages connectivity through appropriate backend JDBC drivers while preserving database-specific differences.', 'All three database engines must use the same wire protocol.'],
                    answer: 1,
                    explanation: 'OJP’s Type 3 driver communicates with OJP servers. Those servers use backend JDBC drivers, allowing a consistent connection-management approach across configured, supported database technologies.'
                }
            },
            {
                title: 'The Migration That Wasn’t Magic',
                story: 'Six months later, the company decided to migrate one application to another database engine. An enthusiastic manager declared that the new architecture would make the migration effortless. Rowan disagreed. The team still had to examine SQL syntax, stored procedures, data types, transaction behavior, and migration procedures. The common connectivity layer could be reused, but the application and database changes still needed testing. The migration succeeded after careful preparation. Rowan closed his report. The architecture had not eliminated complexity. It had removed unnecessary dependencies while leaving the real engineering challenges visible.',
                challenge: {
                    prompt: 'What does OJP make easier during a database migration?',
                    options: ['Reusing a common connectivity architecture, while still addressing database-specific compatibility and migration work.', 'Executing every existing SQL statement on an unrelated database without modification.', 'Replacing the database engine without validating data types, transaction behavior, or application queries.'],
                    answer: 0,
                    explanation: 'OJP reduces coupling at the database connectivity layer. It does not provide universal SQL translation, automatic data migration, or guaranteed behavioral compatibility.'
                }
            }
        ],
        victory: 'Rowan had solved the case. The company wasn’t trapped by its databases; it was trapped by unnecessary assumptions about the infrastructure surrounding them.'
    },
    {
        id: 'database-freedom-racing', name: 'The Championship Without Borders', genre: 'Racing',
        badge: 'Independent Racing Strategist', icon: 'racing', palette: ['#46301f', '#ffc66d'],
        description: 'Imani coordinates training across specialist racing academies without vendor dependence.',
        voice: 'A championship planning log',
        acts: [
            {
                title: 'The Three Racing Academies',
                story: 'Imani managed a racing team competing across Europe. To prepare for different circuits, the team used three specialist racing academies. Each academy had its own simulator provider, booking system, and operating procedures. The simulators were excellent. But coordinating training across the three facilities was exhausting. Every new academy meant another management system to learn and maintain. When one simulator provider increased its licensing fees, the team had few alternatives without reorganizing its training operations. Imani wanted to compete on the track, not depend on a growing collection of proprietary scheduling systems.',
                challenge: {
                    prompt: 'What is creating unnecessary operational complexity?',
                    options: ['Different circuits require different driving techniques.', 'Each facility depends on its own management infrastructure, making coordination and supplier changes more difficult.', 'The racing team participates in too many championships.'],
                    answer: 1,
                    explanation: 'Multiple database-specific or cloud-specific connectivity technologies can increase operational complexity and dependence on particular products.'
                }
            },
            {
                title: 'One Championship Platform',
                story: 'Imani proposed a common training-coordination platform. The team would manage simulator bookings and training schedules through one interface. Each academy would retain the software needed to operate its specialist simulators. The new platform connected to those systems through appropriate integrations. It did not make a simulator for a wet Monaco lap behave like one configured for a dry Silverstone lap. Those differences remained important. But the team could organize its training across facilities without rebuilding its management process each time.',
                challenge: {
                    prompt: 'What is the primary value of the common platform?',
                    options: ['It replaces every simulator’s specialized capabilities with one universal driving model.', 'It requires every academy to buy simulators from the same manufacturer.', 'It provides consistent coordination while allowing each facility to retain its specialized systems.'],
                    answer: 2,
                    explanation: 'OJP can provide a consistent database connectivity-management layer across different supported database engines, without removing their distinct features or semantics.'
                }
            },
            {
                title: 'A New Simulator Supplier',
                story: 'One academy announced a major upgrade. Its simulator provider was being replaced. Under the old arrangements, the change would have disrupted the team’s entire booking and management process. With the common platform, the team could retain its overall coordination system. Engineers still had to integrate the new simulators and verify that the equipment behaved as expected. But the change remained concentrated within the affected facility. Imani approved the investment. The team had gained the freedom to choose the best equipment for each circuit.',
                challenge: {
                    prompt: 'What is the realistic advantage of this architecture?',
                    options: ['Supplier changes can be handled with less disruption to common infrastructure, though compatibility work remains.', 'Any simulator can replace another without integration or validation.', 'Once a shared platform exists, specialized simulator software is never needed again.'],
                    answer: 0,
                    explanation: 'A common connectivity layer reduces the need to replace the entire management stack when technologies change. It does not remove system-specific integration or migration work.'
                }
            }
        ],
        victory: 'Imani’s team entered the championship with one goal: choose the best technology for the race, rather than choosing the race around its technology.'
    },
    {
        id: 'database-freedom-engineering', name: 'Escape the Vendor Maze', genre: 'Engineering reality',
        badge: 'Agnostic Architecture Champion', icon: 'engineering', palette: ['#20384b', '#86d7f0'],
        description: 'An architecture team untangles database choice from connection-management infrastructure.',
        voice: 'An architecture review',
        acts: [
            {
                title: 'The Fragmented Database Estate',
                story: 'A financial services organization operated three major relational database technologies. PostgreSQL supported newer applications. Oracle powered several established systems. SQL Server served internal business platforms. Each technology had its own connectivity infrastructure, operational procedures, monitoring conventions, and deployment requirements. Some of the solutions were tied to particular database families or cloud-managed offerings. The architecture team wanted to introduce a consistent way to manage database connectivity. They didn’t want to replace working databases. They wanted to reduce the operational complexity created by maintaining separate connectivity stacks.',
                challenge: {
                    prompt: 'What is the team’s main architectural objective?',
                    options: ['Replace every database with one vendor’s product regardless of application requirements.', 'Remove the need for applications to understand database-specific SQL.', 'Reduce unnecessary fragmentation in connectivity infrastructure while retaining appropriate database choices.'],
                    answer: 2,
                    explanation: 'Organizations with heterogeneous database estates can face additional operational costs from maintaining different proxies, configuration models, monitoring systems, and platform dependencies.'
                }
            },
            {
                title: 'A Database-Agnostic Control Layer',
                story: 'The architects evaluated Open J Proxy. OJP provided a JDBC Type 3 driver that applications could use to communicate with OJP servers. The servers managed backend connections through appropriate JDBC drivers for their configured databases. This allowed the organization to standardize important aspects of connection pooling, admission control, throttling, observability, and resilience. The applications still had to use SQL and database capabilities compatible with their respective engines. The new architecture also introduced an additional network hop and an infrastructure component that needed to be operated. But the team now had a common connectivity approach across multiple database technologies.',
                challenge: {
                    prompt: 'What is the most accurate description of OJP’s database-agnostic architecture?',
                    options: ['OJP automatically converts every application query to every supported database dialect.', 'OJP provides common connectivity management across supported databases while using appropriate backend JDBC drivers.', 'OJP requires the organization to migrate every application to one database engine.'],
                    answer: 1,
                    explanation: 'OJP separates the application’s connectivity layer from the backend database driver. Its server can manage connections to configured databases using compatible JDBC drivers, but SQL semantics remain database-specific.'
                }
            },
            {
                title: 'The Freedom Test',
                story: 'A year later, the organization planned to migrate one application’s database from Oracle to PostgreSQL. The application team needed to assess SQL syntax, stored procedures, data types, transactions, performance, and data migration. OJP would not perform those tasks automatically. However, the organization could retain its common connectivity architecture and configure an appropriate backend driver and data source. The team did not have to replace an entire database-specific proxy stack simply because the chosen database engine changed. The migration still required engineering effort. The architectural benefit was that database choice had become less entangled with the infrastructure used to manage connections.',
                challenge: {
                    prompt: 'Which conclusion best describes database portability with OJP?',
                    options: ['OJP eliminates database-specific SQL and makes all migrations automatic.', 'OJP makes application and database testing unnecessary when switching vendors.', 'OJP can reduce infrastructure coupling, but database migration and application compatibility remain separate engineering responsibilities.'],
                    answer: 2,
                    explanation: 'OJP provides database-agnostic connectivity management, not universal application portability. Changing engines can still require SQL rewrites, schema and data migrations, testing, and operational changes.'
                }
            }
        ],
        victory: 'The architecture review ended with a new principle: choose databases for their technical merits, and avoid allowing connectivity infrastructure to dictate every future decision.'
    }
];
