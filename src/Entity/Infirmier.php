<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\InfirmierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=InfirmierRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['infirmiers_read']],
    attributes: ["pagination_enabled" => false]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'prenom' => 'partial', 'nom' => 'exact', 'service.nom' => 'partial'])]

class Infirmier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"infirmiers_read", "vaccination_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"infirmiers_read"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"infirmiers_read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"infirmiers_read"})
     */
    private $age;


    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="infirmiers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"infirmiers_read"})
     */
    private $service;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="infirmier", cascade={"persist", "remove"})
     * @Groups({"infirmiers_read"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Vaccination::class, mappedBy="infirmier")
     */
    private $vaccinations;

    /**
     * @ORM\OneToMany(targetEntity=CreneauInfirmier::class, mappedBy="infirmier", orphanRemoval=true)
     * @Groups({"infirmiers_read"})
     */
    private $creneauinfirmiers;


    public function __construct()
    {
        $this->vaccinations = new ArrayCollection();
        $this->creneauinfirmiers = new ArrayCollection();
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }


    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setInfirmier(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getInfirmier() !== $this) {
            $user->setInfirmier($this);
        }

        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Vaccination[]
     */
    public function getVaccinations(): Collection
    {
        return $this->vaccinations;
    }

    public function addVaccination(Vaccination $vaccination): self
    {
        if (!$this->vaccinations->contains($vaccination)) {
            $this->vaccinations[] = $vaccination;
            $vaccination->setInfirmier($this);
        }

        return $this;
    }

    public function removeVaccination(Vaccination $vaccination): self
    {
        if ($this->vaccinations->removeElement($vaccination)) {
            // set the owning side to null (unless already changed)
            if ($vaccination->getInfirmier() === $this) {
                $vaccination->setInfirmier(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Creneauinfirmier[]
     */
    public function getCreneauinfirmiers(): Collection
    {
        return $this->creneauinfirmiers;
    }

    public function addCreneauinfirmier(Creneauinfirmier $creneauinfirmier): self
    {
        if (!$this->creneauinfirmiers->contains($creneauinfirmier)) {
            $this->creneauinfirmiers[] = $creneauinfirmier;
            $creneauinfirmier->setInfirmier($this);
        }

        return $this;
    }

    public function removeCreneauinfirmier(Creneauinfirmier $creneauinfirmier): self
    {
        if ($this->creneauinfirmiers->removeElement($creneauinfirmier)) {
            // set the owning side to null (unless already changed)
            if ($creneauinfirmier->getInfirmier() === $this) {
                $creneauinfirmier->setInfirmier(null);
            }
        }

        return $this;
    }
}
