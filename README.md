# 🧠 Division of Linguistic Labor — Experimental Task

This repository contains a **nodeGame-based experimental platform** designed to study the **Division of Linguistic Labor**. Participants collaborate to classify items (e.g., dog breeds), relying on partial expertise and communication, reflecting real-world distributed knowledge scenarios.

The experiment is fully functional and **ready for deployment** in both lab and online settings.

---

## 🎯 Research Goal

This task investigates how people divide communicative responsibility when they have asymmetric knowledge. It is grounded in theories of category learning, distributed cognition, and communication under uncertainty.

---

## 🕹 Platform Features

- Real-time multiplayer coordination using [nodeGame](https://nodegame.org)
- Spanish-language interface for paired communication
- Automated data logging and export in JSON format
- Modular structure for easy customization
- Includes query system to ask/answer questions during classification

---

## 🚀 Getting Started with nodeGame

To run this experiment, you need to install and run the [nodeGame](https://nodegame.org) platform. Follow these steps:

### 1. Install Node.js (version ≥ 16 recommended)

Download and install from [https://nodejs.org](https://nodejs.org)

### 2. Install nodeGame

```bash
npm install -g nodegame
````

### 3. Clone and Link the Experiment Repository

```bash
git clone https://github.com/Slendercoder/DLL.git
cd DLL
nodegame link
```

### 4. Run the Server

```bash
nodegame start
```

Open your browser and go to:
[http://localhost:8080](http://localhost:8080)

You can now assign players and start the experiment from the nodeGame admin interface.

---

## 🧪 Experimental Details

This task has been used in academic studies such as:

> Andrade-Lotero, E., Bianconi, M., & Goldstone, R. L. (2022). *Category boundaries and the division of linguistic labor*. Philosophical Transactions of the Royal Society B, 377(1859), 20210360.
> [https://doi.org/10.1098/rstb.2021.0360](https://doi.org/10.1098/rstb.2021.0360)

---

## 📄 Data

* Raw data is saved in JSON format by default
* Compatible with scripts in [SPUoDLL](https://github.com/EAndrade-Lotero/SPUoDLL) for analysis
* Suitable for behavioral metrics like accuracy, query frequency, answer correctness, and response timing

---

## 🛠 Customization

This experiment is modular and can be extended or modified:

* Add new stages or roles in `game.js`
* Adjust UI templates in `views/`
* Customize game logic in `client_types/` and `server/`

---

## 📬 Contact

For questions or collaboration inquiries:

* Edgar J. Andrade-Lotero — [edgar.andrade@urosario.edu.co](mailto:edgar.andrade@urosario.edu.co)
* Robert L. Goldstone — [rgoldsto@indiana.edu](mailto:rgoldsto@indiana.edu)

---

## 📄 License

This project is intended for academic use. Please contact the authors before reusing or modifying the experiment.
