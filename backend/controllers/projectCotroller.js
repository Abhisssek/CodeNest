const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const { nanoid } =  import("nanoid");


// Create a project
exports.createProject = async (req, res) => {
  const { name, language, projectType } = req.body;
  const userId = req.user.id; // from auth middleware

  try {
    // Import nanoid dynamically here
    const { nanoid } = await import("nanoid");

    const project = await Project.create({
      name,
      language,
      projectType,
      host: userId,
      inviteCode: nanoid(10),
       // unique code
       collaborators: [userId], // add the host as the first collaborator
    });

    await User.findByIdAndUpdate(userId, { projectCreated: project._id });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Join a project
exports.joinProject = async (req, res) => {
  const { inviteCode } = req.body;
  const userId = req.user.id;

  try {
    const project = await Project.findOne({ inviteCode });
    if (!project) return res.status(404).json({ message: "Invalid code" });

    if (project.collaborators.includes(userId)) {
      return res.status(400).json({ message: "Already a collaborator" });
    }

    project.collaborators.push(userId);
    await project.save();

    await User.findByIdAndUpdate(userId, { projectJoined: project._id });

    res.status(200).json({ message: "Joined project", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get all own projects
exports.getAllProjects = async (req, res) => {
    const userId = req.user.id; // from auth middleware
    
    try {
        const projects = await Project.find({ host: userId })
        .populate("host", "name userName email")
        .populate("collaborators", "name userName email");
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//get all projects of a collaborator
exports.getCollaboratorProjects = async (req, res) => {
  const userId = req.user.id; // from auth middleware

  try {
    const projects = await Project.find({ collaborators: userId })
      .populate("host", "name userName email")
      .populate("collaborators", "name userName email");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get a single project
exports.getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id)
      .populate("host", "name userName email")
      .populate("collaborators", "name userName email");
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// remove a collaborator
exports.removeCollaborator = async (req, res) => {
  const { projectId, collaboratorId } = req.body;
  const host = req.user.id; // from auth middleware

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (!project.collaborators.includes(collaboratorId)) {
      return res.status(400).json({ message: "Not a collaborator" });
    }
    if(host.toString() === collaboratorId) {
      return res.status(400).json({ message: "Cannot remove host" });
    }

    // Check if the user is the host
    if (project.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized" });
    }
    project.collaborators = project.collaborators.filter(
      (id) => id.toString() !== collaboratorId
    );
    await project.save();
    await User.findByIdAndUpdate(collaboratorId, {
      projectJoined: null,
    });
    res.status(200).json({ message: "Collaborator removed" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//update code files in the project
exports.updateCodeFiles = async (req, res) => {
  const { projectId, codeFiles } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    project.codeFiles = codeFiles;
    await project.save();
    res.status(200).json({ message: "Code files updated" });

  }catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



//delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const host = req.user.id; // from auth middleware

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await User.findByIdAndUpdate(project.host, { projectCreated: null });
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};