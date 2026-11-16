const p = text => `<p>${text}</p>`;
const section = (id, title, body) => ({ id, title, body });
const tip = (title, text) => `<aside class="callout"><span aria-hidden="true">↳</span><div><strong>${title}</strong><p>${text}</p></div></aside>`;
const steps = items => `<ol class="steps">${items.map(([title, text]) => `<li><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol>`;
const table = (heads, rows) => `<div class="table-wrap" tabindex="0" role="region" aria-label="${heads.join(' and ')}"><table><thead><tr>${heads.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((v, i) => i ? `<td>${v}</td>` : `<th scope="row">${v}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const captureNote = 'SAMPLE-01 1.1.0 (7) development build · Generated demo audio';
export const screens = [
  { id: 'editor', file: '01-editor.png', title: 'Sample editor', caption: 'Arrange passages, build a new idea and refine a short sample sequence. Current 1.1.0 build 7 interface with generated demo audio.', color: 'orange' },
  { id: 'arrangement', file: '02-arrangement.png', title: 'Arrangement', caption: 'Place reusable patterns on a longer song timeline. Current 1.1.0 build 7 interface with generated demo audio.', color: 'purple' },
  { id: 'synths', file: '03-synths.png', title: 'Synths', caption: 'Write and generate Bass, Lead, Poly and Pad parts. Current 1.1.0 build 7 interface with generated demo audio.', color: 'blue' },
  { id: 'drums', file: '04-drums.png', title: 'Drums', caption: 'Program eleven synthesized drum voices and generate editable rhythms. Current 1.1.0 build 7 interface with generated demo audio.', color: 'pink' },
  { id: 'mixer', file: '05-mixer.png', title: 'Mixer', caption: 'Balance samples, synths, individual drum voices and the master output. Current 1.1.0 build 7 interface with generated demo audio.', color: 'yellow' },
  { id: 'library', file: '06-library.png', title: 'Songs & library', caption: 'Browse indexed songs and filter passages by length, source tempo and key. Current 1.1.0 build 7 interface with generated demo audio.', color: 'mint' }
];
const screen = (id, caption) => {
  const s = screens.find(item => item.id === id);
  return `<figure class="screen-figure"><button class="screen-image" data-image="assets/manual/${s.file}" data-title="${s.title}" data-caption="${captureNote}" aria-label="Enlarge ${s.title} screenshot"><img src="assets/manual/${s.file}" alt="SAMPLE-01 ${s.title} interface using generated demo audio" width="1600" height="1000" loading="lazy"><span>View full screen ↗</span></button><figcaption><span class="eyebrow">INSIDE THE APP</span><strong>${s.title}</strong>${caption || s.caption}</figcaption></figure>`;
};

export const groups = [
  { name: 'Start here', items: ['welcome', 'quickstart', 'library'] },
  { name: 'Find & shape samples', items: ['passages', 'transport', 'editor', 'ideas', 'progressions', 'replacements'] },
  { name: 'Build the music', items: ['drums', 'drum-sounds', 'synths', 'piano-roll', 'sound', 'mixer'] },
  { name: 'Arrange & keep', items: ['arrangement', 'projects', 'export'] },
  { name: 'Reference', items: ['shortcuts', 'help', 'screens', 'privacy', 'about'] }
];

export const pages = {
  welcome: {
    title: 'Welcome', icon: 'home', label: 'THE SAMPLE-01 MANUAL',
    description: 'From a collection of recordings to an editable musical idea.', time: 'START HERE', sections: []
  },

  quickstart: {
    title: 'Your first sample idea', icon: 'play', label: 'START HERE',
    description: 'Index a folder, find a passage and make a short sequence you can keep.', time: '5 MIN READ',
    sections: [
      section('start', 'Start with a collection',
        p('SAMPLE-01 is built for exploring large sample collections without spending time dropping each individual track into a DAW. It also works with smaller collections: choose a folder, index the recordings and audition musical passages in one place.') +
        tip('Development build manual', 'This guide covers the current local 1.1.0 (7) development build. Its synths, drums, mixer and arrangement features may differ from earlier builds. <a href="#/about">About this edition →</a>') +
        steps([
          ['Choose a folder', 'Use <b>File → Choose SAMPLE Folder…</b>, or open <b>Index library · batch or all songs</b> in Library and choose <b>Choose folder…</b>.'],
          ['Index a first batch', 'Choose <b>Scan next 10</b> for a manageable start, or <b>Scan all songs</b> for the folder. The app reads FLAC, MP3 and WAV files without changing the originals.'],
          ['Browse the results', 'Use <b>Refresh library</b> when indexing finishes. Select a song, choose a passage Length and click a waveform to audition it once.']
        ])),
      section('build', 'Build a loop in Editor',
        p('Drag a passage from Library to Editor. Drag its body to move it and its right edge to shorten it. Set <b>Bars</b> to 1, 2, 4 or 8 and add more passages. Use the global Play and Loop controls with <b>Workspace</b> selected.') +
        p('For a starting point made from one recording, choose <b>New idea</b>. Listen, keep the parts you like and try <b>Vary current</b> for different responses or endings. <a href="#/ideas">Learn how the locks work →</a>') +
        screen('editor')),
      section('develop', 'Add drums and synths',
        p('Open <b>Drums</b> and click steps to program a beat, or try a generated pattern. Open <b>Synths</b>, choose Bass, Lead, Poly or Pad, and draw notes or generate a part. <b>Follow editor samples</b> uses the sample-key estimates as a guide; <b>Manual key</b> lets you choose your own harmony.') +
        p('Use <b>Mixer</b> to balance the parts. When you want a longer structure, open <b>Arrangement</b>, enter an Idea name and choose <b>Add workspace</b>. <a href="#/arrangement">Build an arrangement →</a>')),
      section('keep', 'Save the work and take it onward',
        p('Use <b>File → Save Project</b> to save the editable project. Use <b>File → Export → Editor WAV…</b> for an audio version of the short workspace, or export the longer arrangement from Arrangement.') +
        tip('Keep the audio with the project', 'A normal <b>.sample01</b> project stores settings and audio references. Choose a <b>Portable Project ZIP</b> when you need an editable copy with its required audio. Recovery autosave is separate from saving the named project. <a href="#/projects">Projects & recovery →</a>'))
    ]
  },

  library: {
    title: 'Index & browse a library', icon: 'folder', label: 'START HERE',
    description: 'Make a searchable local index while keeping the original recordings untouched.', time: '4 MIN READ',
    sections: [
      section('index', 'Choose and index a folder',
        p('Use <b>File → Choose SAMPLE Folder…</b> to select the folder containing your recordings. In Library, open <b>Index library · batch or all songs</b>. <b>Scan next 10</b> processes a batch; <b>Scan all songs</b> continues through the collection. Unchanged files are skipped on later scans.') +
        p('<b>Cancel scan</b> stops after the current recording. Check <b>Skipped files</b> for items that could not be processed, then use <b>Refresh library</b> to load the indexed results.') +
        table(['Input', 'Current support'], [
          ['Audio formats', 'FLAC, MP3 and WAV.'],
          ['Recording length', 'Up to 20 minutes per source file.'],
          ['Channels and sample rate', 'Up to 8 channels and 192 kHz.'],
          ['Original files', 'Read for analysis and playback; never rewritten by SAMPLE-01.']
        ])),
      section('songs', 'Use Songs and Library together',
        p('<b>Songs</b> lists the indexed recordings. Use <b>Find song or artist</b> to narrow that list, then select a song to show its passages in Library. <b>All songs</b> returns to the whole index. Selecting a song keeps your Length choice and clears the key and source-BPM filters.') +
        p('The <b>Songs</b> and <b>Library</b> buttons show or hide each sidebar independently. Drag the divider beside Songs to adjust its width. Smaller windows can show the panels over the workspace; hiding a panel gives the editor more room.') +
        screen('library')),
      section('maintain', 'Keep the index useful',
        p('Use Refresh library to reload existing results; scan again to analyze new or changed recordings. If a source has moved, restore access to its folder before trying to audition it. A saved project that refers to the original library still needs those files.') +
        tip('Indexing and audio preparation share resources', 'A new pitch, tempo or preview render can wait while the current recording is being indexed. Let that recording finish, or cancel the scan and continue working. <a href="#/help">Troubleshooting →</a>'))
    ]
  },

  passages: {
    title: 'Find & audition passages', icon: 'wave', label: 'FIND & SHAPE SAMPLES',
    description: 'Narrow the collection by musical length, source tempo and key, then trust your ears.', time: '4 MIN READ',
    sections: [
      section('filters', 'Choose the passage you need',
        table(['Filter', 'What it controls'], [
          ['Length', '¼, ½, 1, 2, 4 or 8 bars, or All lengths. The suggestions assume 4/4 time.'],
          ['BPM', 'The original estimated tempo, rounded to a whole BPM. This is independent of Playback BPM.'],
          ['Key source', 'Passage estimate analyzes each excerpt. File tag uses the recording’s key metadata.'],
          ['Key', 'A specific key, All keys, or the available Uncertain / Untagged category.'],
          ['Beat grid', 'Detected, Half tempo or Double tempo for the selected song. See <a href="#/transport/beat-grid">Beat-grid interpretation</a>.']
        ]) +
        p('Each passage shows its source position, musical length, duration, key information and a miniature waveform. Results are paged, so use the navigation controls to continue through a song or the collection.')),
      section('audition', 'Listen before placing',
        p('Click a passage waveform to audition it once. <b>Audition sample</b> plays the selection once again; <b>Loop sample</b> repeats it. The global Stop control ends playback. Drag a passage into Editor when you want to use it in a sequence.') +
        p('A taller miniature waveform is not proof that one passage is louder than another: each cell is normalized for display. Listen or use the mixer meters when comparing levels.')),
      section('estimates', 'Read estimates as suggestions',
        p('Passage detection assumes 4/4 and looks for nearby kick- or snare-like transients. Instrument detection inside a full mix is approximate, and windows without nearby drum evidence may be omitted. Sparse, irregular or changing-tempo recordings can produce fewer useful suggestions.') +
        tip('Key is an estimate', 'Short passages, drum-heavy audio, tuning drift and relative major/minor relationships can mislead the analysis. <b>Uncertain</b> means there is no clear match, not that the passage is unusable. A file tag is separate metadata, not confirmation of the detected key. Listen before committing to a harmonic match.'))
    ]
  },

  transport: {
    title: 'Playback, tempo & pitch', icon: 'play', label: 'FIND & SHAPE SAMPLES',
    description: 'Choose what plays and change its timing without rewriting the source audio.', time: '4 MIN READ',
    sections: [
      section('playback', 'Choose the playback source',
        p('The global transport selects <b>Workspace</b> or <b>Arrangement</b>. Workspace plays the short editor with its enabled drum and synth parts. Arrangement plays the longer song timeline. Use Play, Stop and the Loop toggle for the selected source.') +
        p('<b>Bars</b> sets the short workspace to 1, 2, 4 or 8 bars; it is separate from the full arrangement length. With Workspace Loop off, playback completes its cycle. Arrangement uses its own loop brace. Press Stop again while already stopped to return the arrangement to bar one.') +
        p('Space toggles playback when focus is outside a field, button or dialog. Local sample and instrument audition controls are useful for checking a sound separately from the full mix.')),
      section('tempo-pitch', 'Separate tempo from pitch',
        table(['Control', 'Result'], [
          ['Playback BPM', 'Sets the playback tempo from 40 to 240 BPM. Audio is time-stretched to follow it.'],
          ['Source tempo', 'Clears the playback-tempo override.'],
          ['Pitch', 'Transposes sample audio from −12 to +12 semitones while preserving its duration.'],
          ['Reset pitch', 'Returns the global sample transposition to zero.']
        ]) +
        p('Tempo stretching and pitch shifting are independent. A new setting can require audio preparation before it is heard. Large changes can soften transients or reveal processing artifacts, so compare the result at a smaller change when needed. Original recordings stay unchanged.')),
      section('beat-grid', 'Correct a half- or double-time interpretation',
        p('Select a song, then choose <b>Detected</b>, <b>Half tempo</b> or <b>Double tempo</b> under Beat grid. This changes how the song’s detected timing is interpreted. It does not retune the audio or require a new scan.') +
        tip('Already-placed clips keep their timing', 'The setting belongs to the song. Existing saved clips retain their captured timing; choose a new passage, replace the clip or make a New idea to use the revised interpretation.'))
    ]
  },

  editor: {
    title: 'Edit sample sequences', icon: 'grid', label: 'FIND & SHAPE SAMPLES',
    description: 'Arrange passages into a short workspace, then refine their timing and balance.', time: '4 MIN READ',
    sections: [
      section('place', 'Place and shape clips',
        p('Open <b>Editor</b> and drag a passage from Library onto the canvas. Drag the clip body to move it; drag its right edge to trim it. Set the workspace Bars to 1, 2, 4 or 8. Gaps play as silence, so you can leave deliberate space between phrases.') +
        screen('editor') +
        tip('Shortening is reversible', 'Clips beyond the workspace end are retained. Playback and editor export stop at the current boundary; increase Bars again to reveal the later material. <b>Clear editor</b> clears sample clips, not the drum and synth parts.')),
      section('select', 'Work with one clip or a group',
        p('Click to select a clip and Shift-click to select more. Use Copy, Paste, Duplicate and Delete from Edit or their keyboard shortcuts. Copy and paste preserve the relative positions of a selected group. Duplicate places a copy after the selection when there is room.') +
        p('If an edit would not fit, SAMPLE-01 reports the problem instead of overwriting clips. Undo and Redo cover the editing actions. A clip’s context menu also offers sample export, hook creation and key-matched replacement. <a href="#/shortcuts">Keyboard reference →</a>')),
      section('levels', 'Balance passages before building further',
        p('<b>Match levels</b> applies a fixed stereo gain adjustment to help passages sit together. It targets an approximate −18 dBFS RMS level, limits upward gain to 12 dB and preserves peak headroom. It is not a compressor and does not raise near-silence.') +
        p('Use global Pitch for the overall sample transposition and the clip’s transposition controls for individual changes. The Sample mixer channel provides the shared final sample balance. <a href="#/mixer">Mixer →</a>'))
    ]
  },

  ideas: {
    title: 'New idea & Random locks', icon: 'spark', label: 'FIND & SHAPE SAMPLES',
    description: 'Build a recurring hook from one song, keep useful constraints and vary the response.', time: '5 MIN READ',
    sections: [
      section('new', 'Generate a New idea',
        p('<b>New idea</b> searches indexed passages from one song and builds an editable hook. It weighs timing, tone, energy and recorded drum activity, repeats a motif and can introduce different responses near the end of a phrase. A completed draw replaces the sample editor and normally auditions once.') +
        p('Ideas use equal-length chops of ¼, ½, 1 or 2 bars, with 4–32 chops in a sequence. Unlocked ideas generally make 4- or 8-bar workspaces; a compatible locked Editor length can constrain that total. Recent results are avoided, and an unsuccessful draw leaves the editor unchanged.') +
        tip('A musical starting point', 'This is a constructed arrangement of recorded passages, not a claim that the app has identified the original song’s hook. New idea keeps the recorded pitch relationships between chops; the global Pitch setting still applies.')),
      section('locks', 'Set a value, then lock it',
        p('The row is called <b>Random locks</b>. First choose the value you want to preserve, then enable its lock. The highlighted lock state shows what the next draw must respect. Locks are kept with the project and recovery state.') +
        table(['Lock', 'What stays fixed'], [
          ['Hook pattern', 'The selected repeated-letter structure and its number of chops.'],
          ['Song', 'The selected source recording.'],
          ['Playback BPM', 'The current playback tempo. When unlocked, a New idea follows the chosen source’s rounded BPM.'],
          ['Key', 'The selected estimated key. New idea looks for that key rather than transposing other passages into it.'],
          ['Length', 'The length of each source chop.'],
          ['Editor length', 'The total workspace length.']
        ]) +
        tip('Length and Editor length are different', 'A one-bar chop repeated four times makes a four-bar workspace. Locking both values also constrains which hook patterns can fit. The current build has no Source BPM lock.')),
      section('vary', 'Vary the current response',
        p('<b>Vary current</b> keeps the opening motif and its repeats while looking for different responses or endings. It preserves the current timing and relevant settings. Use it when the basic idea works and you want a related version.') +
        p('The current editor must be a full, compatible same-song hook: 4–32 equal, untrimmed indexed chops with no gaps or individual pitch shifts. If manual edits or lock combinations make the sequence ineligible, the status explains why and keeps the editor unchanged. Choose New idea or loosen a lock to continue.') +
        tip('Portable audio and the search index', 'A portable project can reopen its saved audio without the original collection. Searching for new replacements or varying that hook still needs suitable passages in the indexed library.')),
      section('pattern', 'Choose a hook shape deliberately',
        p('The <b>Hook pattern</b> selector includes <b>Auto / vary pattern</b> and named letter patterns. Repeated letters reuse the same chop. Selecting a pattern updates the progression preview; it does not silently replace the editor. Add or replace the progression, or make a New idea, to commit a new sequence.') +
        p('If no hook fits, first try unlocking Hook pattern, Length or Editor length. A smaller collection or a song with few aligned passages naturally offers fewer combinations. <a href="#/progressions">Hooks & progressions →</a>'))
    ]
  },

  progressions: {
    title: 'Hooks & progressions', icon: 'piano', label: 'FIND & SHAPE SAMPLES',
    description: 'Build phrases from repeated sample motifs or use a harmonic progression as a guide.', time: '4 MIN READ',
    sections: [
      section('sample', 'Create a sequence from a passage',
        steps([
          ['Choose a starting passage', 'Audition a passage, then open its context menu and choose <b>Create sample hook</b> or <b>Create sample progression</b>.'],
          ['Choose a Pattern', 'Use an automatic hook, a named repeated-letter pattern or an available numeral progression. Preview the result before placing it.'],
          ['Commit the sequence', 'Choose <b>Add whole progression to editor</b> to append it, or <b>Replace editor with progression</b> to use it as the new sample sequence.']
        ]) +
        p('The total length comes from the passage length multiplied by the number of steps. Choosing a longer editor does not automatically stretch a short progression to fill it.')),
      section('letters', 'Understand letters and chord numerals',
        table(['Pattern', 'How it behaves'], [
          ['Repeated letters', 'Each repeat uses the same source chop and its individual pitch setting. Different letters refer to different passages.'],
          ['Explicit chord numerals', 'The requested harmonic sequence can use matching passages or a same-mode pitch-matched fallback.'],
          ['New idea', 'Creates a same-song hook that preserves recorded pitch relationships, with its own Random lock rules.']
        ]) +
        p('These are related workflows, but their harmonic matching is not identical. A literal progression may transpose a fallback passage; New idea does not use per-chop transposition to satisfy its Key lock.')),
      section('reference', 'Use the Library progression reference',
        p('Select a key in Library to enable the <b>Progressions</b> tab. It presents chord progressions for that key and lets you audition synthesized chord examples. Those examples are a harmonic reference; they are separate from the recorded passages in Samples.') +
        tip('Check the harmony by ear', 'A passage’s estimated key does not describe every chord inside it. A matched label is a useful lead, not a guarantee of exact chord compatibility. <a href="#/replacements">Find a replacement passage →</a>'))
    ]
  },

  replacements: {
    title: 'Find a replacement', icon: 'wave', label: 'FIND & SHAPE SAMPLES',
    description: 'Audition another passage while preserving the place and role of the current one.', time: '3 MIN READ',
    sections: [
      section('open', 'Open the replacement picker',
        p('Open a passage or editor clip’s context menu and choose <b>Find key-matched replacement…</b>. The picker looks within the same source recording and interpreted passage length, with a duration tolerance of about 10%. Direct estimated-key matches come first.') +
        p('The optional pitch-matched fallback can offer same-mode passages that need transposition. Drum-phase alignment is available and enabled by default. Both the matching and alignment are estimates, so audition the result in context.')),
      section('preview', 'Preview, then commit',
        steps([
          ['Select a candidate', 'Click a candidate row to preview it once. Hovering does not select or play it.'],
          ['Compare deliberately', 'Arrow keys move the selection silently. Use Enter, Space or Preview to hear the selected candidate.'],
          ['Keep the replacement', 'Choose <b>Replace</b> to commit. Escape or Cancel closes the picker and retains the existing sequence.']
        ])),
      section('repeats', 'Preserve the phrase structure',
        p('Replacement keeps the clip’s position, musical length and target key. In Editor, <b>Replace matching repeats</b> can update repeated instances together. In a hook progression, repeats of the same hook letter are kept together.') +
        tip('No suitable candidate?', 'Try disabling a matching restriction or choose a different passage. An imported project’s recovery audio is sufficient for playback, but the original indexed library may be needed to search for alternatives.'))
    ]
  },

  drums: {
    title: 'Program drums', icon: 'drum', label: 'BUILD THE MUSIC',
    description: 'Write a beat with eleven synthesized voices or generate a rhythm to edit.', time: '4 MIN READ',
    sections: [
      section('steps', 'Place hits on the grid',
        p('Open <b>Drums</b>. The eleven voices are kick, snare, low tom, mid tom, high tom, rim, clap, closed hat, open hat, crash and ride. Each bar has 16 steps. Click a step to cycle from off to a normal hit to an accented hit, then back to off.') +
        p('Click a voice to audition it. Use its mute control to silence the row. <b>Follow</b> follows the active page during playback; turning it off lets you edit a different page while the pattern runs.') +
        screen('drums')),
      section('generate', 'Generate a rhythm',
        p('Use <b>Generate house</b>, <b>Generate boom-bap</b> or <b>Generate breaks</b> for an editable starting point. The breaks controls include <b>Vary breaks</b>, <b>Amen-style</b> and <b>Jungle</b>. These build original rhythms using synthesized voices; they do not load a recording of a break.') +
        p('Generation replaces the steps within the visible workspace length and can be undone. Shortening the workspace hides later bars without deleting them. Expand Bars again to recover the later pattern.')),
      section('feel', 'Set the feel and inclusion',
        p('<b>Swing</b> runs from 50% to 70% and affects the drums. Use a modest amount first, then listen against the sample’s existing rhythm. Closed and open hats choke each other, and drum tails stop at the workspace boundary.') +
        p('<b>Include drums</b> controls their participation in workspace monitoring and editor audio export. Dedicated drum export has its own options. Change the kit and voice character in <a href="#/drum-sounds">Drum sounds</a>, then use Mixer for the final balance.'))
    ]
  },

  'drum-sounds': {
    title: 'Shape the drum kit', icon: 'drum', label: 'BUILD THE MUSIC',
    description: 'Choose a kit and adjust each synthesized voice without rewriting the beat.', time: '3 MIN READ',
    sections: [
      section('kits', 'Open Kit sounds',
        p('Choose <b>Kit sounds…</b> in Drums, or right-click a voice to open its sound controls. The preset collection spans House / Club, Boom-bap and Jungle / Breaks. Selecting a kit changes the sounds while preserving the steps, mute states and swing.') +
        p('The instruments use original 909-inspired synthesis. Treat the presets as starting points for your own sound, rather than exact hardware or recorded-break reproductions.')),
      section('controls', 'Shape a voice',
        table(['Control', 'What it changes'], [
          ['Level', 'The voice’s source level before its mixer channel.'],
          ['Tune', 'The pitch of the synthesized drum.'],
          ['Tone', 'Its tonal balance or noise character.'],
          ['Decay', 'How long the sound falls away.'],
          ['Voice-specific controls', 'Kick Attack, snare Snappy, clap Spread and ride Bell provide additional character.']
        ]) +
        p('Drag a knob for a broad change, hold Shift for a finer adjustment, or use the arrow keys when focused. The value input allows exact entry. Double-click resets the control. Sound changes are heard after the updated audio is ready.')),
      section('reset', 'Reset and balance independently',
        p('<b>Reset voice</b> returns that voice’s sound settings without clearing its steps. Save the project to keep kit choices and edits. The drum mixer faders are separate from voice Level, so you can change the final balance without redesigning the kit.') +
        p('For separate audio files or a MIDI version of the pattern, use <b>Export drums…</b>. <a href="#/export/drums">Drum export options →</a>'))
    ]
  },

  synths: {
    title: 'Build synth parts', icon: 'piano', label: 'BUILD THE MUSIC',
    description: 'Create Bass, Lead, Poly and Pad parts that follow your samples or a chosen key.', time: '5 MIN READ',
    sections: [
      section('tracks', 'Choose a track',
        p('Open <b>Synths</b> and choose <b>Bass</b>, <b>Lead</b>, <b>Poly</b> or <b>Pad</b>. Bass and Lead work with single-note parts; Poly and Pad work with grouped chords. Bass also offers the <b>Two-oscillator bass</b> and <b>Acid 303</b> engines.') +
        p('Use <b>Track on</b> to include a part in the workspace. Each track has its own Patch selection, note editor, local playback controls and <b>Export track…</b>. Local audition helps you inspect one part without changing its saved inclusion or mixer settings.') +
        screen('synths')),
      section('harmony', 'Choose the harmonic guide',
        table(['Harmony mode', 'How generation is guided'], [
          ['Follow editor samples', 'Follows the sounding key estimates along the sample timeline, including sample transposition. Gaps or passages without a useful key do not generate new notes.'],
          ['Manual key', 'Uses the Key and major/minor Scale you choose.']
        ]) +
        tip('Generation does not transcribe the recording', 'The guide uses estimated key information rather than a complete chord analysis. Existing drawn or locked notes stay as they are until you edit or regenerate them.')),
      section('generate', 'Generate and constrain a part',
        p('Choose <b>Generate [track] · play once</b> for a new part and a single audition, or <b>Generate all</b> to build parts across the enabled tracks. The generated notes remain editable. Use the <b>rhythm</b>, <b>notes</b> and <b>sound</b> locks to keep the aspects you like.') +
        table(['Controls', 'Use them to'], [
          ['Allowed notes', 'Limit a mono part to chord tones, scale tones, root only, root + fifth or a custom note set.'],
          ['Root octave / Octave span', 'Choose the register and how widely a part can move.'],
          ['Pattern bars / Step grid', 'Set the generated phrase length and rhythmic spacing.'],
          ['Density / note length / Gate', 'Control how busy and sustained the phrase becomes.'],
          ['Accent / Slide / Leaps', 'Shape emphasis, connected movement and melodic jumps.'],
          ['Generated chord / Voicing', 'Guide Poly and Pad chord quality and use close, open or moving-inversion voicings.']
        ])),
      section('refine', 'Refine without losing the starting point',
        p('Generator setting changes reuse the current seed to make a related result while preserving the sound. Generate asks for a new variation. Selecting a patch locks the sound so later generation can keep it.') +
        p('Use the note mask to see and adjust the allowed pitches: enabled notes are highlighted and the root is underlined. The <b>Other notes</b> controls expose the remaining chromatic choices. Edit the result in the <a href="#/piano-roll">piano roll</a> or shape its <a href="#/sound">sound and effects</a>.'))
    ]
  },

  'piano-roll': {
    title: 'Edit notes & chords', icon: 'piano', label: 'BUILD THE MUSIC',
    description: 'Draw, move and reshape MIDI-style events inside each synth track.', time: '4 MIN READ',
    sections: [
      section('draw', 'Draw a note or a whole chord',
        p('In Select mode, double-click empty grid space to create an event. In Draw mode, click or drag in empty space. Press <b>B</b> while the roll is focused to switch modes. Double-click an existing event to erase it.') +
        p('Bass and Lead create individual notes. Poly and Pad create chord groups: choose <b>Chord type</b> and <b>Chord length</b>, then place the root. Their supported chord lengths run from 1/32 to 8 bars. Moving a chord moves its tones together.')),
      section('select', 'Move, resize and copy',
        p('Shift-click to select more events, or drag a selection marquee. Drag the selected group to move it; drag the right edge to resize. Delete or Backspace removes the selection. Arrow keys nudge selected events, and Shift with the up or down arrow moves them by an octave.') +
        p('Copy and paste retain complete groups and their performance values. Click empty space to set a paste position; Duplicate appends a copy. If a destination collides with existing events, the edit is rejected as a whole. Poly and Pad can exchange chord groups; mono tracks do not accept chord groups.') +
        p('<b>⌘A</b> selects the active roll’s events. Escape clears the selection. Click a piano key, note or chord to audition it; Stop ends the preview.')),
      section('grid', 'Separate editing snap from generation',
        p('The piano-roll Grid controls the editing snap, from 1/32 to 1/2. Changing it does not move notes already drawn. It is separate from the generator’s Step grid, which controls newly generated rhythms.') +
        tip('Keep hidden work', 'Reducing the workspace length hides later events without deleting them. Expand Bars to reveal them again. Drag the roll’s lower edge to change its height; double-click that edge to return to the default height.'))
    ]
  },

  sound: {
    title: 'Synth sound & effects', icon: 'sliders', label: 'BUILD THE MUSIC',
    description: 'Start from a patch, shape the instrument and add movement or space.', time: '4 MIN READ',
    sections: [
      section('voice', 'Shape the main instrument',
        p('Choose a track and a <b>Patch</b>, then refine its sound. The classic engine has two oscillators with waveform, semitone and fine tuning, plus blend, pulse, sub and noise controls. The filter offers low-pass, band-pass and high-pass modes with resonance and drive.') +
        p('Separate amplitude and filter ADSR envelopes control the volume and filter movement over a note. Glide connects pitches. The LFO adds movement through its waveform, rate and pitch or filter depth. Make one change at a time and audition against the sample.')),
      section('acid', 'Use the Acid 303 engine',
        p('On Bass, set Engine to <b>Acid 303</b> and choose an <b>Acid patch</b>. Its dedicated controls include Cutoff, Resonance, Env mod, Decay, Accent, Slide time, Drive, Tune and Level. Accent and connected-slide information in the notes affect how the phrase plays.') +
        tip('Different envelope controls', 'The Acid engine uses its dedicated decay and envelope controls rather than the classic ADSR behavior. Its oscillator layering can change the tone further; audition the phrase after changing engines.')),
      section('effects', 'Add effects and compare',
        table(['Effect', 'Character'], [
          ['Distortion', 'Soft clip, Overdrive, Fuzz, Metal, Diode, Foldback or Bit crush.'],
          ['Chorus', 'Adds width and movement.'],
          ['Echo', 'Beat-synced ping-pong repeats.'],
          ['Reverb', 'Adds a sense of space and a longer tail.']
        ]) +
        p('Use each effect’s bypass to compare the processed sound. Changes may need a new audio render, especially with longer patterns or more active voices. If the sound is still updating, let preparation finish before judging the change.') +
        tip('Audio and MIDI serve different purposes', 'WAV preserves the rendered instrument and effects. MIDI carries notes and performance information for another instrument; it does not reproduce the SAMPLE-01 patch or effect chain.'))
    ]
  },

  mixer: {
    title: 'Balance the mix', icon: 'levels', label: 'BUILD THE MUSIC',
    description: 'Control the sample bus, four synth parts, eleven drum voices and master output.', time: '4 MIN READ',
    sections: [
      section('channels', 'Find the channel you need',
        p('Open <b>Mixer</b>. Channels are grouped as Sample, Synths, Drums and Master. Scroll horizontally to reach more channels, or collapse a group to save space. Collapsing a group changes the view and does not silence it.') +
        p('The Sample channel affects sample auditions, progressions and editor output consistently. Synth and drum channels let you balance the accompaniment. Voice sound Level and mixer level are separate stages.') +
        screen('mixer')),
      section('balance', 'Adjust levels, pan, mute and solo',
        p('Move a fader to change level and a pan control to place the channel in stereo. Mute silences a channel. Solo isolates channels; multiple solos can be active together, and a channel’s mute takes priority over its solo.') +
        p('Double-click a fader to return to 0 dB or a pan control to return to center. Hold Shift for finer adjustment. Focused controls also respond to keyboard arrows. The meters show the rendered audio; click a clip indicator to clear it after correcting the level.')),
      section('output', 'Check the master and export',
        p('Keep some headroom at Master, especially when several parts enter together. If the output clips, lower the contributing channels or master level and listen again. Live mixer changes affect playback and are included in audio export.') +
        tip('Do not double the reference mix', 'Arrangement stems are aligned for import into a DAW. The ZIP also includes a reference mix: use it for comparison rather than playing it alongside all stems. MIDI is not an exact rendering of the mixer, instrument sound or effects.'))
    ]
  },

  arrangement: {
    title: 'Build an arrangement', icon: 'arrange', label: 'ARRANGE & KEEP',
    description: 'Capture a short workspace and place its parts across a longer song timeline.', time: '5 MIN READ',
    sections: [
      section('capture', 'Turn a workspace into a pattern',
        steps([
          ['Finish a short idea', 'Build a 1-, 2-, 4- or 8-bar workspace with samples, drums and synths.'],
          ['Name and add it', 'Open <b>Arrangement</b>, enter an <b>Idea name</b> and choose <b>Add workspace</b>. This captures a reusable pattern and places its parts on the timeline.'],
          ['Place it again', 'Choose the pattern in the pattern selector and use <b>Place pattern</b> for another linked placement. Use <b>Make unique</b> when the selected placement needs independent content.']
        ]) +
        p('The arrangement starts with 32 bars and can extend to 512. It has one playback tempo; captured patterns retain their own sample-pitch settings. Select Arrangement in the global playback source to hear the song.') +
        screen('arrangement')),
      section('clips', 'Move, trim and repeat clips',
        p('Drag a clip’s body to move it and its edges to trim its range. The inspector provides position, length and source-offset controls. Enable <b>Loop clips</b> when an extended clip should repeat its source pattern. Snap choices range from 1/32 to 4 bars.') +
        p('Shift-click or use a marquee to select multiple clips. Option-drag copies a clip; Copy, Paste and Duplicate support larger edits. Use <b>⌘E</b> to split at the cursor and Delete to remove a selection. Undo is available for arrangement edits.') +
        tip('Linked placements and independent copies', '<b>Place pattern</b> reuses a pattern, so editing that pattern affects its linked placements. Copying creates an independent copy. Use <b>Make unique</b> before editing when a linked placement should become a separate variation.')),
      section('edit-pattern', 'Edit the pattern behind a clip',
        p('Double-click a clip or choose <b>Edit pattern</b> to open its source in the relevant workspace. The banner reads <b>Live edits · all linked placements</b>. Changes are prepared in the background and update the linked placements when the new audio is ready.') +
        p('Choose <b>Done editing</b> to return to Arrangement. This current build uses live pattern editing, so you do not need a separate Update pattern step for every edit made in that mode. Make the pattern unique first if only one placement should change.')),
      section('navigate', 'Navigate, loop and finish',
        p('Click the ruler to seek. Move or resize the loop brace to focus playback on a section. Section markers help you find parts of a longer song. Track groups can be collapsed and their mute/solo controls remain available.') +
        p('Tempo and content changes can require background preparation. The current playback can continue while the updated audio is prepared, then switch at the current musical position. Save the project as you develop it and choose the export range when the arrangement is ready. <a href="#/export/arrangement">Arrangement export →</a>'))
    ]
  },

  projects: {
    title: 'Projects, saves & recovery', icon: 'folder', label: 'ARRANGE & KEEP',
    description: 'Keep an editable project, understand its audio references and make a portable copy.', time: '4 MIN READ',
    sections: [
      section('save', 'Save a named project',
        table(['File command', 'Use'], [
          ['New Project · ⌘N', 'Start a new editable project.'],
          ['Open Project… · ⌘O', 'Open a .sample01 project or a portable project ZIP.'],
          ['Open Recent', 'Return to a recently opened project.'],
          ['Save Project · ⌘S', 'Write the current changes to the named project.'],
          ['Save Project As… · ⇧⌘S', 'Choose a new name or location.']
        ]) +
        p('The window title indicates unsaved changes. A project keeps the editor, arrangement, synth and drum settings, mixer state and other editing choices. A normal <b>.sample01</b> file refers to its audio rather than packaging the full original collection.')),
      section('portable', 'Keep the required audio with the project',
        p('Use <b>File → Export → Portable Project ZIP…</b> when moving a project or keeping an editable copy with its audio. The portable archive includes project data and recovery audio. Open the ZIP directly through Open Project; you do not need to extract it or rescan the original collection first.') +
        tip('Playback is portable; browsing still needs a library', 'Imported recovery audio lets saved parts play without the original recordings. New idea, Vary current and replacement searches still rely on a suitable indexed collection. A normal project that references original files needs continued access to those files.')),
      section('recovery', 'Distinguish recovery from Save',
        p('SAMPLE-01 keeps local recovery state as you edit. Recovery does not overwrite your named project file: use Save Project to commit the current state to that file. If you choose Discard when closing or changing projects, the app returns to the last saved project state, or a blank state for an unsaved project.') +
        p('Use <b>Help → Show Recovery Files</b> to locate recovery data. Undo history is session-based and does not continue across reopening a project. Keep separate backups of work you want to preserve; recovery is not a versioned backup system.')),
      section('snapshots', 'Use saved editor snapshots',
        p('The saved-editor controls provide local snapshots with <b>Save new</b>, <b>Update saved</b>, <b>Load</b> and <b>Delete saved</b>. These are separate from the named project workflow. Deleting a saved snapshot moves that snapshot to its local trash; it does not clear the current editor or delete the source recordings.') +
        p('<b>File → Show Saved Arrangements</b> opens the local saved-work location. For a copy that carries the wider editable project and audio, use the portable ZIP workflow above.'))
    ]
  },

  export: {
    title: 'Export audio, MIDI & projects', icon: 'export', label: 'ARRANGE & KEEP',
    description: 'Choose a rendered mix, separate parts or an editable archive for the next stage.', time: '5 MIN READ',
    sections: [
      section('editor', 'Export the short workspace',
        table(['Export', 'What you receive'], [
          ['File → Export → Editor WAV…', 'A rendered workspace mix using the current tempo, sample pitch, enabled instruments and mixer settings.'],
          ['File → Export → Editor Samples…', 'A ZIP containing the visible editor sample cells and a manifest; it does not add drum parts to each sample file.'],
          ['Clip menu → Export sample WAV', 'A WAV of the selected sample clip.'],
          ['File → Export → Portable Project ZIP…', 'An editable project archive with the audio required for recovery.']
        ]) +
        p('Workspace exports respect the current Bars boundary. Expand it before exporting if you need material that is currently hidden beyond the end.')),
      section('drums', 'Export drum and synth parts',
        p('<b>Export drums…</b>, also available through <b>File → Export → Drum WAV / MIDI…</b>, offers WAV with MIDI, WAV stems and MIDI patterns. Check <b>Include muted voices</b> if you want muted drum voices in that export. Dedicated voice exports let you keep individual parts separately from the workspace mix.') +
        p('In Synths, use <b>Export track…</b> for the selected track’s WAV or MIDI, or use <b>Selected Synth WAV…</b> and <b>Selected Synth MIDI…</b> in the File export menu.') +
        tip('Use WAV for the sound; MIDI for the performance', 'MIDI carries note and performance information and needs an instrument in the receiving app. It does not contain the SAMPLE-01 patch, processing or exact rendered mix.')),
      section('arrangement', 'Export an arrangement mix or ZIP',
        p('In Arrangement, choose <b>Export arrangement WAV</b> or the ZIP option. Enable <b>Loop region only</b> when you want just the marked range. When preparation finishes, use the generated save link to choose the destination.') +
        table(['Inside an arrangement ZIP', 'Purpose'], [
          ['Reference_mix.wav', 'A complete mix for listening and checking the imported parts.'],
          ['Stems/', 'Audio for active tracks, aligned to the same start and export duration.'],
          ['MIDI/', 'Instrument performance data for further editing.'],
          ['Arrangement.sample01', 'The editable arrangement document.'],
          ['Project_audio/', 'Audio needed by the portable project.'],
          ['READ_ME.txt', 'Import notes for the exported material.']
        ]) +
        p('Arrangement audio and stems are 24-bit, 44.1 kHz stereo. If a render exceeds 0 dBFS, export stops with a message to lower the Master or channel faders. The ZIP has a 2 GiB size limit; try a shorter export range if the complete song exceeds it.')),
      section('daw', 'Bring the parts into a DAW',
        steps([
          ['Match the tempo', 'Set the receiving project to the arrangement’s tempo.'],
          ['Align the stems', 'Place every stem at the same starting position and keep their shared duration. Disable automatic warping or time-stretching if it would alter the rendered timing.'],
          ['Compare with the reference', 'Listen to the stems together, then compare against Reference_mix.wav. Keep the reference muted while playing the stems to avoid doubling the audio.'],
          ['Assign instruments to MIDI', 'Load a suitable instrument for each MIDI part and choose its sound. Use the WAV version when you need the exact rendered SAMPLE-01 sound.']
        ]))
    ]
  },

  shortcuts: {
    title: 'Keyboard & controls', icon: 'cursor', label: 'REFERENCE',
    description: 'Move between workspaces and edit the focused part with the keyboard.', time: '3 MIN READ',
    sections: [
      section('navigation', 'Projects and navigation',
        table(['Shortcut', 'Action'], [
          ['⌘N / ⌘O', 'New Project / Open Project.'],
          ['⌘S / ⇧⌘S', 'Save Project / Save Project As.'],
          ['⇧⌘O', 'Choose SAMPLE Folder.'],
          ['⌘1 / ⌘2 / ⌘3', 'Editor / Arrangement / Synths.'],
          ['⌘4 / ⌘5', 'Drums / Mixer.'],
          ['⌥⌘S / ⌥⌘L', 'Show Songs / Show Library.'],
          ['Space', 'Toggle the selected playback source when focus is outside controls, text fields and dialogs.'],
          ['⌘W', 'Close the window.']
        ])),
      section('editing', 'Edit the active workspace',
        table(['Shortcut or gesture', 'Action'], [
          ['⌘Z / ⇧⌘Z', 'Undo / Redo.'],
          ['⌘X / ⌘C / ⌘V', 'Cut / Copy / Paste in the focused editor.'],
          ['⌘D / ⌘A', 'Duplicate / Select all.'],
          ['Delete or Backspace', 'Delete the selection.'],
          ['Shift-click', 'Add to or adjust a selection.'],
          ['Escape', 'Dismiss the active dialog, cancel a drag or clear a selection as appropriate.'],
          ['⌘E in Arrangement', 'Split at the cursor.'],
          ['Option-drag in Arrangement', 'Copy a clip.'],
          ['B in a focused piano roll', 'Switch Select / Draw mode.'],
          ['Arrows in a piano roll', 'Nudge selected events; Shift + up/down transposes by an octave.']
        ])),
      section('controls', 'Use controls precisely',
        p('Tab and Shift-Tab move focus through controls. Focused knobs and faders respond to arrow keys; hold Shift for a fine adjustment where supported. Double-click a mixer fader to reset it to 0 dB or pan to center. Drum sound knobs also provide exact value entry and double-click reset.') +
        p('Text fields keep their normal text-editing behavior. Shortcuts act on the active workspace, so select the relevant editor first. Open <b>Help → Keyboard Shortcuts</b> for the in-app reference.'))
    ]
  },

  help: {
    title: 'Troubleshooting', icon: 'help', label: 'REFERENCE',
    description: 'Resolve common library, playback, generation and save problems.', time: '4 MIN READ',
    sections: [
      section('library', 'Missing files or too few passages',
        table(['Symptom', 'Check'], [
          ['No songs appear', 'Choose the SAMPLE folder, run a scan and Refresh library. Clear song search and restrictive filters.'],
          ['A file was skipped', 'Open Skipped files. Check its format, duration and whether the file can be read. Supported sources are FLAC, MP3 and WAV, up to 20 minutes.'],
          ['A saved clip cannot find audio', 'Restore access to its original folder. A normal .sample01 file may still refer to that collection; a portable ZIP can carry recovery audio.'],
          ['Few or no passages fit', 'Try All lengths, All BPM and All keys. Sparse percussion, irregular timing and uncertain analysis can limit the suggestions.'],
          ['The musical length feels wrong', 'Select the song and compare Detected, Half tempo and Double tempo under Beat grid.']
        ])),
      section('audio', 'Silence or delayed playback',
        p('Check the selected playback source first: Workspace and Arrangement contain different material. Then check that the part has events, its inclusion or Track on control is enabled, and its mixer channel is not muted or excluded by another solo. Inspect channel and master levels, then the Mac’s selected audio output.') +
        p('New tempo, pitch, sound or arrangement settings can require audio preparation. Indexing shares processing resources, so audition preparation may wait for the current recording to finish. Let the current task complete before trying again.') +
        tip('A local audition is a useful check', 'Preview one sample, drum voice or synth track. If that works, inspect workspace inclusion and mixer routing. If nothing plays, check the output device and master level.')),
      section('ideas', 'A New idea or variation cannot be built',
        p('Read the status message, then try loosening Hook pattern, Length or Editor length. Those locks must describe a compatible total. A locked song or key can leave too few aligned passages for a fresh result. An unsuccessful draw keeps the current editor intact.') +
        p('Vary current needs an eligible full same-song hook of equal untrimmed indexed chops. Gaps, manual trims, individual pitch changes or missing library references can prevent variation. Use New idea to start another eligible sequence.')),
      section('keep', 'Save, recovery and export problems',
        p('If Save fails, check access to the destination and available disk space, then try <b>Save Project As…</b> in a writable location. Recovery autosave does not update the named project file. Use <b>Help → Show Recovery Files</b> to inspect local recovery data.') +
        p('For a large arrangement ZIP, export a shorter loop region to stay within the archive limit. If an exported MIDI file is silent elsewhere, assign an instrument to it; MIDI itself contains no audio. <a href="#/export">Export reference →</a>') +
        p('Use <b>Help → SAMPLE-01 Help</b> and <b>Help → Keyboard Shortcuts</b> for in-app assistance. The native macOS menus documented here are outside the workspace screenshots.'))
    ]
  },

  screens: {
    title: 'Inside SAMPLE-01', icon: 'image', label: 'REFERENCE',
    description: 'Explore the current interface. Select any screenshot to see it at full size.', time: '6 VIEWS',
    sections: [
      section('samples', 'Find and shape sample material',
        p('These screenshots show the current 1.1.0 (7) development interface with generated demo audio, rather than personal recordings. The native macOS menu bar is not shown.') + screen('editor') + screen('library')),
      section('instruments', 'Build accompanying parts', screen('synths') + screen('drums')),
      section('finish', 'Arrange and balance', screen('arrangement') + screen('mixer'))
    ]
  },

  privacy: {
    title: 'App privacy', icon: 'info', label: 'REFERENCE',
    description: 'How the SAMPLE-01 app handles your audio and project data.', time: '2 MIN READ',
    sections: [
      section('scope', 'This policy covers the app',
        p('This privacy policy applies to the SAMPLE-01 application. It describes the app’s handling of your audio and local project data. It does not describe the hosting or data practices of this documentation website.') +
        p('SAMPLE-01 does not send your audio or other app data off your device. It does not send analytics or crash reports.')),
      section('local', 'Audio and working data stay local',
        p('Audio indexing, analysis, auditioning and rendering take place on your Mac. The app reads the audio folders you choose and keeps its index, settings, project information and recovery data locally. Original recordings are not modified.') +
        p('Saved projects can contain references to source files. Portable project exports include the audio needed to reopen the saved work. Those files are written to storage you choose; any later sharing or copying is your action.')),
      section('control', 'Your files remain under your control',
        p('You choose the folders the app can read and where to save projects and exports. Use the app’s saved-work and recovery commands to locate local working files. Deleting a saved editor snapshot does not delete the original recordings.') +
        p('Policy reviewed for this documentation edition on 16 November 2026.'))
    ]
  },

  about: {
    title: 'About this manual', icon: 'info', label: 'REFERENCE',
    description: 'The build covered by this guide and the scope of its examples.', time: '2 MIN READ',
    sections: [
      section('edition', 'Current development edition',
        p('This manual documents the local <b>SAMPLE-01 1.1.0 (7) development build</b>. It was checked against source revision <code>a4dc2cd</code> on <b>16 November 2026</b>. Features and interface details can change as development continues.') +
        tip('Check the build you are using', 'This guide covers the expanded Editor, Arrangement, Synths, Drums and Mixer workflow. Earlier builds may have different controls or may not include every feature shown here.')),
      section('purpose', 'A guide to using the app',
        p('SAMPLE-01 helps turn a collection of recordings into playable passages and editable musical ideas. Indexing and auditioning a large collection in one place reduces the repeated work of dropping individual tracks into a DAW. The same tools are useful with a small, focused collection.') +
        p('This site is documentation. Its chapters explain the app’s controls, local file workflow and export formats. Keyboard shortcuts and File-menu instructions refer to the native macOS app.')),
      section('examples', 'Screenshots and estimates',
        p('The current screenshots use generated demo audio and show the development interface. They do not contain personal recordings. Select a screenshot to enlarge it; the <a href="#/screens">interface gallery</a> collects all six views.') +
        p('Tempo, passage boundaries and key are heuristic estimates. The guide explains what those estimates mean so you can use them as starting points and confirm the result by listening. <a href="#/privacy">Read the app privacy policy →</a>'))
    ]
  }
};

export const pageOrder = groups.flatMap(group => group.items);
export const legacyRoutes = {
  top: 'welcome', start: 'quickstart', discover: 'passages', editor: 'editor',
  randomization: 'ideas', progressions: 'progressions', export: 'export', notes: 'help',
  workflow: 'quickstart', interface: 'screens', features: 'welcome', availability: 'about'
};
